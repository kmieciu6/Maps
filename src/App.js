import './scss/main.scss';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './components/Home'
import Maps from './components/Maps'
import History from './components/History'
import NotFoundPage from './components/NotFoundPage'
import LocalStorageRemove from "./components/LocalStorageRemove";
import React from "react";

function App() {
    return (
        <>
            <LocalStorageRemove/>
            <BrowserRouter>
                <Routes>
                    <Route exatc path='/' element={<Home/>}/>
                    <Route exatc path='/maps' element={<Maps/>}/>
                    <Route exatc path='/history' element={<History/>}/>
                    <Route exatc path='/*' element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
