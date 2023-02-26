import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';

const History = () => {
    const [myData, setMyData] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const myFormDataString = localStorage.getItem("myFormData");
    const myFormData = myFormDataString && JSON.parse(myFormDataString);
    const data = {
        start: queryParams.get('start') || '',
        destination: queryParams.get('destination') || '',
        distance: queryParams.get('distance') || '',
        duration: queryParams.get('duration') || '',
        cost: queryParams.get('cost') || '',
    }

    if (myFormData) {
        data.start = myFormData.start;
        data.destination = myFormData.destination;
        data.distance = myFormData.distance;
        data.duration = myFormData.duration;
        data.cost = myFormData.cost;
    }

    useEffect(() => {
        const data = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('myFormData')) {
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                data.push(parsedValue);
            }
        }
        setMyData(data);
    }, []);


    return (
        <section>
            <Link to='/'>
                <button className='btn_nav'>Strona główna</button>
            </Link>
            <Link to='/history'>
                <button className='btn_nav'>Historia</button>
            </Link>
            <h1>Historia</h1>

            {myData.map((data, index) => (
                <div key={index}>
                    <p>Start: {data.start}</p>
                    <p>Cel: {data.destination}</p>
                    <p>Dystans: {data.distance}</p>
                    <p>Czas: {data.duration}</p>
                    <p>Koszt: {data.cost}</p>
                    <hr />
                </div>
            ))}


        </section>
    );
};

export default History;