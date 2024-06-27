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

const CardsForm = ({ setDisplayCreateCardComp, cardDataToSubmit, setCardDataToSubmit, onSubmitClick, onCancelClick }) => {


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
                            Create Card
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
                                        value={cardDataToSubmit.title}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, title: e.target.value })}
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
                                        value={cardDataToSubmit.subtitle}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, subtitle: e.target.value })}
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
                                        value={cardDataToSubmit.description}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, description: e.target.value })}
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
                                        value={cardDataToSubmit.phone}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, phone: e.target.value })}
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
                                        value={cardDataToSubmit.email}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, email: e.target.value })}
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
                                        value={cardDataToSubmit.web}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, web: e.target.value })}
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
                                        value={cardDataToSubmit.imgurl}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, imgurl: e.target.value })}
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
                                        value={cardDataToSubmit.imgalt}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, imgalt: e.target.value })}
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
                                        value={cardDataToSubmit.state}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, state: e.target.value })}
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
                                        value={cardDataToSubmit.country}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, country: e.target.value })}
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
                                        value={cardDataToSubmit.city}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, city: e.target.value })}
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
                                        value={cardDataToSubmit.street}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, street: e.target.value })}
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
                                        value={cardDataToSubmit.houseNumber}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, houseNumber: e.target.value })}
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
                                        value={cardDataToSubmit.zip}
                                        onChange={(e) => setCardDataToSubmit({ ...cardDataToSubmit, zip: e.target.value })}
                                    />
                                </Grid>


                                {/* --------------------------------------------- */}

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => onSubmitClick()}
                            >
                                Submit
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
                </Container>
            </ThemeProvider>

        </div>
    )
}

export default CardsForm
