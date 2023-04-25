import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';
import { Button, Container, Grid, TextField } from '@mui/material';

const Chat = () => {
    const { auth, firestore } = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <Container>
            <Grid container style={{ height: window.innerHeight - 50 }} justifyContent={'center'} alignItems={'center'}>
                <section style={{ width: '80%', height: '70vh', border: '1px solid gray', overflowY: 'auto' }}>
                </section>
                <Grid container direction={'column'} alignItems={'flex-end'} style={{ width: '80%' }}>
                    <TextField variant='outlined'>
                        <Button>Отправить</Button>
                    </TextField>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;