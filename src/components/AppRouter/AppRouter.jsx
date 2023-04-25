import React, { useContext } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes/routes';
import chat from '../chat/chat';
import login from '../login/login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';

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
                <Route path='*' component={chat} />
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
                    <Route path='*' component={login} />
                </Routes>
            </>
        )
};

export default AppRouter;