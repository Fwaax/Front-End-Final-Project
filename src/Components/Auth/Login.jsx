import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { parseJWT, base64UrlDecode, base64alt } from './Jwt';
import { jwtDecode } from 'jwt-decode';
import useToken from '../Hooks/UserToken';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Login({ setIsLoged, isLoged, setUserLoggedForImg, setLogSuccessful, setUserToken }) {

    // const {
    //     setUserToken,
    //     userToken,
    //     removeToken
    // } = useToken();

    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    async function asyncPost(url, json) {
        let token = null
        try {
            const response = await axios.post(url, json)
            token = response.data;
            return token;
        } catch (error) {
            const errorMESSEGE = 'Email or Password is incorrect'
            setErrorMsg(errorMESSEGE);
            return null;
        }
    }


    async function getImgFromId(token) {
        const userID = parseJWT(token).payload._id;
        const apiResponse = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userID}`, { headers: { "x-auth-token": token } });
        const userImgUrl = apiResponse.data.image.url;
        localStorage.setItem(`imgUrl`, userImgUrl)
        console.log(`userImgUrl: `, userImgUrl);
        setUserLoggedForImg(userImgUrl);
    }


    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const json = {
                email: data.get('email'),
                password: data.get('password')
            }
            const url = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login`
            const token = await asyncPost(url, json);
            isLoged = true;
            console.log(`isLoged(must be true)`, isLoged);
            console.log(`token line 70`, token);
            if (token == null) {
                return
            }
            setUserToken(token);
            console.log(`setUserToken: `, setUserToken);
            getImgFromId(token);
            navigate("/");
        }
        catch (err) {
            console.log(err);
        }
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
                        Login
                    </Typography>
                    {errorMsg != null ? <div>{errorMsg}</div> : <div></div>}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    Don't have an account? Sign up!
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}