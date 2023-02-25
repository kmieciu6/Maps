// import {Link} from "react-router-dom";
// import {useLocation} from 'react-router-dom';
//
// const History = () => {
//
//
//     const myFormData = JSON.parse(localStorage.getItem('myFormData'));
//
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const data = {
//         start: queryParams.get('start') || '',
//         destination: queryParams.get('destination') || '',
//         distance: queryParams.get('distance') || '',
//         duration: queryParams.get('duration') || '',
//         cost: queryParams.get('cost') || '',
//     }
//
//
//     return (
//         <section>
//             <Link to='/'>
//                 <button className='btn_nav'>Strona główna</button>
//             </Link>
//             <Link to='/history'>
//                 <button className='btn_nav'>Historia</button>
//             </Link>
//             <h1>Historia</h1>
//
//             <p>Start: {data.start}</p>
//             <p>Cel: {data.destination}</p>
//             <p>Dystans: {data.distance}</p>
//             <p>Czas: {data.duration}</p>
//             <p>Koszt: {data.cost}</p>
//         </section>
//     );
// };
//
// export default History;
//
//
//
// // import { Link, useLocation } from "react-router-dom";
// //
// // const History = () => {
// //     const { search } = useLocation();
// //     const {
// //         start = "",
// //         destination = "",
// //         distance = "",
// //         duration = "",
// //         cost = "",
// //     } = new URLSearchParams(search);
// //
// //     return (
// //         <section>
// //             <Link to="/">
// //                 <button className="btn_nav">Strona główna</button>
// //             </Link>
// //             <Link to="/history">
// //                 <button className="btn_nav">Historia</button>
// //             </Link>
// //             <h1>Historia</h1>
// //
// //             <p>Start: {start}</p>
// //             <p>Cel: {destination}</p>
// //             <p>Dystans: {distance}</p>
// //             <p>Czas: {duration}</p>
// //             <p>Koszt: {cost}</p>
// //         </section>
// //     );
// // };
// //
// // export default History;



import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';

const History = () => {

    const myFormData = JSON.parse(localStorage.getItem('myFormData'));

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const data = {
        start: queryParams.get('start') || '',
        destination: queryParams.get('destination') || '',
        distance: queryParams.get('distance') || '',
        duration: queryParams.get('duration') || '',
        cost: queryParams.get('cost') || '',
    }

    // Wykorzystanie danych z localStorage
    if (myFormData) {
        data.start = myFormData.start;
        data.destination = myFormData.destination;
        data.distance = myFormData.distance;
        data.duration = myFormData.duration;
        data.cost = myFormData.cost;
    }

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
            <p>Cel: {data.destination}</p>
            <p>Dystans: {data.distance}</p>
            <p>Czas: {data.duration}</p>
            <p>Koszt: {data.cost}</p>
        </section>
    );
};

export default History;
