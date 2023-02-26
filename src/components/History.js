import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import html2pdf from 'html2pdf.js';

const History = () => {
    const [myData, setMyData] = useState([]);
    const [count, setCount] = useState(1);
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
        setCount(data.length);
    }, []);

    const handleDownloadPDF = () => {
        const element = document.getElementById('pdf');
        const opt = {
            margin: 1,
            filename: 'historia.pdf',
            image: {type: 'jpeg', quality: 0.98},
            html2canvas: {scale: 2},
            jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
        };
        html2pdf().from(element).set(opt).save();
    }

    return (
        <section>
            <div className='nav'>
                <Link to='/'>
                    <button className='btn_nav'>Strona główna</button>
                </Link>
                <Link to='/history'>
                    <button className='btn_nav'>Historia</button>
                </Link>
            </div>
            <h1>Historia</h1>
            <button onClick={handleDownloadPDF}>Pobierz PDF</button>
            <div id="pdf">
                {myData.map((data, index) => (
                    <div key={index}>
                        <h2>{count - myData.length + index + 1}</h2>
                        <p>Start: {data.start}</p>
                        <p>Cel: {data.destination}</p>
                        <p>Dystans: {data.distance}</p>
                        <p>Czas: {data.duration}</p>
                        <p>Koszt: {data.cost}</p>
                        <hr/>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default History;