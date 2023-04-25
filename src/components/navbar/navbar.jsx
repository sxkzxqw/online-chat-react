import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/constants';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)
    return (
        <AppBar color={"secondary"} position="static">
            <Toolbar variant={"dense"}>
                <Grid container justifyContent={'flex-end'}>
                    {user ?
                        <Button onClick={() => auth.signOut()} variant={"outlined"}>Выйти</Button>
                        :
                        <Link to={LOGIN_ROUTE}>
                            <Button variant={"outlined"}>Логин</Button>
                        </Link>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;