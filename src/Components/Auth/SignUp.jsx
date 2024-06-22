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
            first: form.get('firstName'), middle: form.get('middleName'), last: form.get('lastName')
        },
        phone: form.get('phone'), email: form.get('email'), password: form.get('password'),
        image: {
            url: form.get('imgurl'), alt: form.get('imgalt')
        },
        address: {
            state: form.get('state'), country: form.get('country'), city: form.get('city'),
            street: form.get('street'), houseNumber: form.get('houseNumber'), zip: form.get('zip')
        },
        isBusiness: stringToBoolean(form.get('isBusiness')),
    }
    return json;
}

const defaultTheme = createTheme();

function isValidName(str) {
    const regex = /^(?=.*[A-Za-z].*[A-Za-z])[A-Za-z\s'-]+$/;
    return regex.test(str) || str === '';
}

function isValidePhoneNumber(phone) {
    const regex = /^(?:\+1\s?)?(\d{3}|\(\d{3}\))[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return regex.test(phone) || phone === '';
}

function isValidaPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=(.*[0-9]){4,})(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
    return regex.test(password) || password === '';
}

function isValideEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email) || email === '';
}

function isValideURL(url) {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/.*)?$/;
    return regex.test(url) || url === '';
}

export default function SignUp() {

    const [inputValues, setInputValues] = useState({
        firstNameValue: "", middleNameValue: "", lastNameValue: "", phoneValue: "",
        emailValue: "", passwordValue: "", imgUrlValue: "", imgAltValue: "",
        stateValue: "", countryValue: "", cityValue: "", streetValue: "",
        houseNumberValue: "", zipValue: "", isBusinessValue: false,
    })
    const [errorMsg, setErrorMsg] = useState('');
    const isFirstNameValid = isValidName(inputValues.firstNameValue);
    const isMiddleNameValid = isValidName(inputValues.middleNameValue);
    const isLastNameValid = isValidName(inputValues.lastNameValue);
    const isStateNameValid = isValidName(inputValues.stateValue);
    const isCountryNameValid = isValidName(inputValues.countryValue);
    const isCityNameValid = isValidName(inputValues.cityValue);
    const isStreetNameValid = isValidName(inputValues.streetValue);
    const isPhoneValid = isValidePhoneNumber(inputValues.phoneValue);
    const isPasswordValid = isValidaPassword(inputValues.passwordValue);
    const isEmailValid = isValideEmail(inputValues.emailValue);
    const isUrlValid = isValideURL(inputValues.imgUrlValue);

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
                        marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Sign up</Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name" name="firstName"
                                    onChange={(e) => setInputValues({ ...inputValues, firstNameValue: e.target.value })}
                                    error={!isFirstNameValid} required fullWidth id="firstName" label="First Name" autoFocus helperText={isFirstNameValid ? "" : "Name must be longer than 2 letters and must not contain any numbers "} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name" name="middleName"
                                    onChange={(e) => setInputValues({ ...inputValues, middleNameValue: e.target.value })}
                                    error={!isMiddleNameValid} fullWidth id="middleName" label="Middle Name" autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    onChange={(e) => setInputValues({ ...inputValues, lastNameValue: e.target.value })}
                                    error={!isLastNameValid} fullWidth id="lastName" label="Last Name" name="lastName" helperText={isLastNameValid ? "" : "Last name must be longer than 2 letters and must not contain any numbers "} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    onChange={(e) => setInputValues({ ...inputValues, phoneValue: e.target.value })}
                                    error={!isPhoneValid} fullWidth id="phone" label="Phone" type="number" name="phone" helperText={isPhoneValid ? "" : "Your phone number must be a valid phone number "} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    onChange={(e) => setInputValues({ ...inputValues, emailValue: e.target.value })}
                                    error={!isEmailValid} fullWidth id="email" label="Email Address" name="email" helperText={isEmailValid ? "" : "Must be a valid email address"} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    onChange={(e) => setInputValues({ ...inputValues, passwordValue: e.target.value })}
                                    error={!isPasswordValid} fullWidth name="password" label="Password" type="password" id="password" helperText={isPasswordValid ? "" : "User password must be at least 8 characters long and contain an uppercase letter , a lowercase letter , a number and of the following characters !@#$%^&*-"} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(e) => setInputValues({ ...inputValues, imgUrlValue: e.target.value })}
                                    error={!isUrlValid} fullWidth name="imgurl" label="Img URL" type="url" id="imgurl" helperText={isUrlValid ? "" : "Must be a valid image URL"} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(e) => setInputValues({ ...inputValues, imgAltValue: e.target.value })}
                                    fullWidth name="imgalt" label="Img ALT" type="text" id="imgalt" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(e) => setInputValues({ ...inputValues, stateValue: e.target.value })}
                                    error={!isStateNameValid} fullWidth name="state" label="State" type="text" id="State" helperText={isStateNameValid ? "" : "Must be a valid State"} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    onChange={(e) => setInputValues({ ...inputValues, countryValue: e.target.value })}
                                    error={!isCountryNameValid} fullWidth name="country" label="Country" type="text" id="country" helperText={isCountryNameValid ? "" : "Must be a valid Country"} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    onChange={(e) => setInputValues({ ...inputValues, cityValue: e.target.value })}
                                    error={!isCityNameValid} fullWidth name="city" label="City" type="text" id="city" helperText={isCityNameValid ? "" : "Must be a valid City"} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    onChange={(e) => setInputValues({ ...inputValues, streetValue: e.target.value })}
                                    error={!isStreetNameValid} fullWidth name="street" label="Street" type="text" id="street" helperText={isStreetNameValid ? "" : "Must be a valid Street"} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    onChange={(e) => setInputValues({ ...inputValues, houseNumberValue: e.target.value })}
                                    fullWidth name="houseNumber" label="House Number" type="number" id="houseNumber" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(e) => setInputValues({ ...inputValues, zipValue: e.target.value })}
                                    fullWidth name="zip" label="Zip" type="number" id="zip" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="true" color="primary" name="isBusiness" />}
                                    label="Signup as business."
                                    onChange={(e) => setInputValues({ ...inputValues, isBusinessValue: e.target.checked })} />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Sign Up</Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2"> Already have an account? Sign in </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {errorMsg && <div>Error: {errorMsg}</div>}
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
} 