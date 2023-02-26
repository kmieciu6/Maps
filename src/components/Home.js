import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {Box, Button, Flex, IconButton, Input, SkeletonText,} from '@chakra-ui/react'
import {FaTimes} from 'react-icons/fa';
import {useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer,} from '@react-google-maps/api';

const LIBRARIES = ['places'];
const center = {lat: 52.412198, lng: 19.270678}

const Home = () => {
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [cost, setCost] = useState('')
    const [counter, setCounter] = useState(0);
    const [errors, setErrors] = useState({});
    const [savedSuccessfully, setSavedSuccessfully] = useState(false);

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBjWWBUScQanlWtEzf-VLdfTIkflI_PEks',
        libraries: LIBRARIES
    })

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()

    const fuelRef = useRef()

    function financial(x) {
        return Number.parseFloat(x).toFixed(1);
    }

    if (!isLoaded) {
        return <SkeletonText/>
    }

    async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destiantionRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
        setCost(financial((results.routes[0].legs[0].distance.value) * fuelRef.current.value.replace(",", ".") / 1000) + ' zł')
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        setCost('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

        const errors = {};
        if (originRef.current.value === '') {
            errors.start = 'Pole wymagane';
        }
        if (destiantionRef.current.value === '') {
            errors.destination = 'Pole wymagane';
        }
        if (fuelRef.current.value === '' || isNaN(parseFloat(fuelRef.current.value))) {
            errors.fuel = 'Pole wymagane i musi zawierać liczbę';
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const newValue = `Value ${counter + 1}`;
        const formData = {
            start: originRef.current.value,
            destination: destiantionRef.current.value,
            distance,
            cost,
            duration,
            newValue
        };
        setCounter(counter + 1);
        const key = `myFormData${new Date().getTime()}`;
        localStorage.setItem(key, JSON.stringify(formData));
        setSavedSuccessfully(true);
        setTimeout(() => {
            setSavedSuccessfully(false)
        }, 3000);
    };

    return (
        <section id='home'>
            <div className='nav'>
                <Link to='/'>
                    <button className='btn_nav'>Strona główna</button>
                </Link>
                <Link to='/history'>
                    <button className='btn_nav'>Historia</button>
                </Link>
            </div>
            <Flex
                position='relative'
                flexDirection='column'
                alignItems='center'
                h='100vh'
                w='100vw'
            >
                <Box position='absolute' left={0} top={0} h='100%' w='100%'>
                    {/* Google Map Box */}
                    <GoogleMap
                        center={center}
                        zoom={7}
                        mapContainerStyle={{width: '100%', height: '100%'}}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                        onLoad={map => setMap(map)}
                    >
                        {directionsResponse && (
                            <DirectionsRenderer directions={directionsResponse}/>
                        )}
                    </GoogleMap>
                </Box>
                <Box
                    p={4}
                    borderRadius='lg'
                    m={4}
                    bgColor='white'
                    shadow='base'
                    minW='container.md'
                    zIndex='1'

                >
                    <form onSubmit={handleSubmit}>
                        <div className='form'>
                            <div className='inputs'>
                                <Autocomplete>
                                    <Input
                                        type='text'
                                        placeholder='Start'
                                        ref={originRef}
                                        name="start"
                                    />
                                </Autocomplete>
                                {errors.start && <p style={{color: 'red'}}>{errors.start}</p>}
                                <Autocomplete>
                                    <Input
                                        type='text'
                                        placeholder='Cel'
                                        ref={destiantionRef}
                                        name="destination"
                                    />
                                </Autocomplete>
                                {errors.destination && <p style={{color: 'red'}}>{errors.destination}</p>}
                                <div>
                                    <Input
                                        type='text'
                                        placeholder='Cena za kilometr'
                                        ref={fuelRef}
                                    />
                                </div>
                                {errors.fuel && <p style={{color: 'red'}}>{errors.fuel}</p>}
                            </div>

                            <div className='info'>
                                <p>Dystans: {distance} </p>
                                <p>Czas: {duration} </p>
                                <p>Koszt: {cost} </p>
                            </div>
                        </div>
                        <div className='buttons'>

                            <div className='button'>
                                <Button
                                    colorScheme='blue'
                                    onClick={calculateRoute}>
                                    Wyznacz i oblicz trasę
                                </Button>
                                <Button
                                    colorScheme='red'
                                    type='submit'>
                                    Zapisz w historii
                                </Button>
                            </div>
                            <IconButton
                                aria-label='center back'
                                background='silver'
                                icon={<FaTimes/>}
                                onClick={clearRoute}
                            />
                            {savedSuccessfully && (<p style={{color: 'green'}}>Dane zostały zapisane pomyślnie!</p>)}
                        </div>
                    </form>
                </Box>
            </Flex>
        </section>
    )
}

export default Home;