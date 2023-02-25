import {Link} from "react-router-dom";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
} from '@chakra-ui/react'
import {FaLocationArrow, FaTimes} from 'react-icons/fa';

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api';

import React, {useRef, useState} from 'react';

const center = {lat: 52.412198, lng: 19.270678}


const Home = () => {

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBjWWBUScQanlWtEzf-VLdfTIkflI_PEks',
        libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [cost, setCost] = useState('')
    const [formData, setFormData] = useState({start: '', finish: '', price: ''});

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
        setCost(financial((results.routes[0].legs[0].distance.value) * fuelRef.current.value / 1000) + ' zł')
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        setCost('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('myFormData', JSON.stringify(formData));
    };


    return (
        <section id='home'>
            <Link to='/'>
                <button className='btn_nav'>Strona główna</button>
            </Link>
            <Link to='/maps'>
                <button className='btn_nav'>Mapa</button>
            </Link>
            <Link to='/history'>
                <button className='btn_nav'>Historia</button>
            </Link>
            <h1>Strona główna</h1>
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
                        <Marker position={center}/>
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
                        <HStack spacing={2} justifyContent='space-between'>
                            <Box flexGrow={1}>
                                <Autocomplete>
                                    <Input
                                        type='text'
                                        placeholder='Start'
                                        ref={originRef}
                                        name="start"
                                        value={formData.start}
                                        onChange={handleChange}
                                    />
                                </Autocomplete>
                            </Box>
                            <Box flexGrow={1}>
                                <Autocomplete>
                                    <Input
                                        type='text'
                                        placeholder='Cel'
                                        ref={destiantionRef}
                                        // name="finish"
                                        // value={formData.finish}
                                        // onChange={handleChange}
                                    />
                                </Autocomplete>
                            </Box>

                            <Box flexGrow={1}>
                                <Input
                                    type='text'
                                    placeholder='Cena za kilometr'
                                    ref={fuelRef}
                                    // name="price"
                                    // value={formData.price}
                                    // onChange={handleChange}
                                />
                            </Box>


                            <ButtonGroup>
                                <Button colorScheme='blue' type='submit' onClick={calculateRoute}>
                                    Wyznacz trasę
                                </Button>
                                <IconButton
                                    aria-label='center back'
                                    icon={<FaTimes/>}
                                    onClick={clearRoute}
                                />
                            </ButtonGroup>
                        </HStack>
                        <HStack spacing={4} mt={4} justifyContent='space-between'>
                            <Text>Dystans: {distance} </Text>
                            <Text>Czas: {duration} </Text>
                            <Text>Koszt: {cost} </Text>
                            <IconButton
                                aria-label='center back'
                                icon={<FaLocationArrow/>}
                                isRound
                                onClick={() => {
                                    map.panTo(center)
                                    map.setZoom(7)
                                }}
                            />
                        </HStack>
                    </form>
                </Box>
            </Flex>
        </section>
    )
}

export default Home;