import 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import NotFound from '../pages/notFound';

function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default UserRoutes;