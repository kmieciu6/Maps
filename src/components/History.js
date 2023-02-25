import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';

const History = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const storedData = localStorage.getItem('myFormData');
        setData(JSON.parse(storedData));
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

            <p>Start: {data.start}</p>
            <p>Cel: {data.finish}</p>
            <p>Koszt: {data.price}</p>
        </section>
    );
};

export default History;
