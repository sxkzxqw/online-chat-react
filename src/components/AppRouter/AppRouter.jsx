import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes/routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';
import Login from '../login/login';
import Chat from '../chat/Chat';

const AppRouter = () => {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)


    return user ? (
        <>
            <Navigate to={{ pathname: "/chat" }} />
            <Routes>
                {privateRoutes.map((route, index) => {
                    return <Route path={route.path} element={route.Component} key={index} />
                })}
                <Route path='*' element={<Chat />} />
            </Routes>
        </>
    )
        : (
            <>
                <Navigate to={{ pathname: "/login" }} />
                <Routes>
                    {publicRoutes.map((route, index) => {
                        return <Route path={route.path} element={route.Component} key={index} />
                    })}
                    <Route path='*' element={<Login />} />
                </Routes>
            </>
        )
};

export default AppRouter;