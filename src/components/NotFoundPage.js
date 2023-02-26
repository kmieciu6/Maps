import {Link} from "react-router-dom";
import React from "react";

const NotFoundPage = () => {
    return (
        <section id='not_found_page'>
            <div className='nav'>
                <Link to='/'>
                    <button className='btn_nav'>Strona główna</button>
                </Link>
                <Link to='/history'>
                    <button className='btn_nav'>Historia</button>
                </Link>
            </div>
            <h1>Error 404</h1>
        </section>
    )
}

export default NotFoundPage;