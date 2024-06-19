import { useState } from 'react'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from './CardObjClassComp';

const EditCardsForm = ({ setDisplayCreateCardComp }) => {


    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                    Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    // Need to connect to Data on line 39 somehow
    const defaultTheme = createTheme();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            title: data.get('title'),
            subtitle: data.get('subtitle'),
        });
        const cardObj = new Card(data.get('title'),
            data.get('subtitle'),
            data.get('description'),
            data.get('phoneCard'),
            data.get('imgurlCard'),
            data.get('emailCard'),
            data.get('imgaltCard'),
            data.get('stateCard'),
            data.get('countryCard'),
            data.get('cityCard'),
            data.get('streetCard'),
            data.get('houseNumberCard'),
            data.get('zipCard'))
        cardObj.getadress();
    };


    return (
        <div>

            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Edit Card
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>

                                {/* ------------- Title ---------------- */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="title"
                                        required
                                        fullWidth
                                        id="title"
                                        label="Title"
                                        autoFocus
                                    />
                                </Grid>

                                {/* ------------- Subtitle ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="subtitle"
                                        fullWidth
                                        id="subtitle"
                                        label="Sub title"
                                        autoFocus
                                    />
                                </Grid>

                                {/* ------------- Description ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        name="description"
                                    />
                                </Grid>

                                {/* ------------- Phone ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phoneCard"
                                        label="Phone"
                                        type="number"
                                        name="phoneCard"
                                    />
                                </Grid>

                                {/* ------------- Email ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="emailCard"
                                        label="Email Address"
                                        name="emailCard"
                                    />
                                </Grid>

                                {/* ------------- Web ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="web"
                                        label="Web"
                                        type="web"
                                        id="web"
                                    />
                                </Grid>

                                {/* ------------- Image url ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="imgurlCard"
                                        label="Img URL"
                                        type="url"
                                        id="imgurlCard"
                                    />
                                </Grid>

                                {/* ------------- Image alt ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="imgaltCard"
                                        label="Img ALT"
                                        type="text"
                                        id="imgaltCard"
                                    />
                                </Grid>

                                {/* ------------- State ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="stateCard"
                                        label="State"
                                        type="text"
                                        id="StateCard"
                                    />
                                </Grid>

                                {/* ------------- Country ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="countryCard"
                                        label="Country"
                                        type="text"
                                        id="countryCard"
                                    />
                                </Grid>

                                {/* ------------- City ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="cityCard"
                                        label="City"
                                        type="text"
                                        id="cityCard"
                                    />
                                </Grid>

                                {/* ------------- Street ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="streetCard"
                                        label="Street"
                                        type="text"
                                        id="streetCard"
                                    />
                                </Grid>

                                {/* ------------- House Number ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="houseNumberCard"
                                        label="House Number"
                                        type="number"
                                        id="houseNumberCard"
                                    />
                                </Grid>

                                {/* ------------- Zip ---------------- */}

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="zipCard"
                                        label="Zip"
                                        type="number"
                                        id="zipCard"
                                    />
                                </Grid>


                                {/* --------------------------------------------- */}

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => setDisplayCreateCardComp(false)}
                            >
                                Edit
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => setDisplayCreateCardComp(false)}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>

        </div>
    )
}

export default EditCardsForm
