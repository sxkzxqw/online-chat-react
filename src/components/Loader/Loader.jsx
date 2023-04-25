import { Grid, Container } from '@mui/material';
import React from 'react';

const Loader = () => {
    return (
        <Container>
            <Grid container style={{ marginTop: '48vh' }}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Grid
                    container
                    alignItems={'center'}
                    direction={'column'}
                >
                </Grid>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </Grid>
        </Container>
    );
};

export default Loader;