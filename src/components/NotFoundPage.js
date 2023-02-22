import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <section id='not_found_page'>
            <Link to='/'>Strona główna</Link>
            <Link to='/maps'>Mapa</Link>
            <Link to='/history'>Historia</Link>
            <h1>Error 404</h1>
        </section>
    )
}

export default NotFoundPage;