import {Link} from "react-router-dom";

const Maps = () => {
    return (
        <section id='maps'>
            <Link to='/'>
                <button className='btn_nav'>Strona główna</button>
            </Link>
            <Link to='/maps'>
                <button className='btn_nav'>Mapa</button>
            </Link>
            <Link to='/history'>
                <button className='btn_nav'>Historia</button>
            </Link>
            <h1>Mapa</h1>
        </section>
    )
}

export default Maps;