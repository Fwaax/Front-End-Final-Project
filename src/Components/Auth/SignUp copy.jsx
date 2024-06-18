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
import axios from 'axios';
import { useState, useEffect } from 'react';

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

function stringToBoolean(string) {
    if (typeof string == "string") {
        if (string == "true") {
            return true
        }
    }

    return false
}

function formToJSON(form) {
    const json = {
        name: {
            first: form.get('firstName'),
            middle: form.get('middleName'),
            last: form.get('lastName')
        },
        phone: form.get('phone'),
        email: form.get('email'),
        password: form.get('password'),
        image: {
            url: form.get('imgurl'),
            alt: form.get('imgalt')
        },
        address: {
            state: form.get('state'),
            country: form.get('country'),
            city: form.get('city'),
            street: form.get('street'),
            houseNumber: form.get('houseNumber'),
            zip: form.get('zip')
        },
        isBusiness: stringToBoolean(form.get('isBusiness')),
    }
    return json;
}

const defaultTheme = createTheme();

// https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users


export default function SignUp() {

    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const json = formToJSON(data)
        axios.post(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users`, json).then(reponse => {
            console.log(reponse.status);
        }).catch(error => {
            setErrorMsg("The Form wasn't filled correctly")
            console.error(error.message);
        })
    };

    return (
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            {/* ------------- First Name ---------------- */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>

                            {/* ------------- Middle Name ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="middleName"
                                    fullWidth
                                    id="middleName"
                                    label="Middle Name"
                                    autoFocus
                                />
                            </Grid>

                            {/* ------------- Last Name ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                />
                            </Grid>

                            {/* ------------- Phone ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone"
                                    type="number"
                                    name="phone"
                                />
                            </Grid>

                            {/* ------------- Email ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                />
                            </Grid>

                            {/* ------------- Password ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </Grid>

                            {/* ------------- Image url ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="imgurl"
                                    label="Img URL"
                                    type="url"
                                    id="imgurl"
                                />
                            </Grid>

                            {/* ------------- Image alt ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="imgalt"
                                    label="Img ALT"
                                    type="text"
                                    id="imgalt"
                                />
                            </Grid>

                            {/* ------------- State ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="state"
                                    label="State"
                                    type="text"
                                    id="State"
                                />
                            </Grid>

                            {/* ------------- Country ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="country"
                                    label="Country"
                                    type="text"
                                    id="country"
                                />
                            </Grid>

                            {/* ------------- City ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="city"
                                    label="City"
                                    type="text"
                                    id="city"
                                />
                            </Grid>

                            {/* ------------- Street ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="street"
                                    label="Street"
                                    type="text"
                                    id="street"
                                />
                            </Grid>

                            {/* ------------- House Number ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="houseNumber"
                                    label="House Number"
                                    type="number"
                                    id="houseNumber"
                                />
                            </Grid>

                            {/* ------------- Zip ---------------- */}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="zip"
                                    label="Zip"
                                    type="number"
                                    id="zip"
                                />
                            </Grid>


                            {/* --------------------------------------------- */}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="true" color="primary" name="isBusiness" />}
                                    label="Signup as business."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {
                    errorMsg && <div>Error: {errorMsg}</div>
                }
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
} 