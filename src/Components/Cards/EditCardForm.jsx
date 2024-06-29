import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from './CardObjClassComp';
import React, { useContext } from 'react'
import { ThemeContext } from '../../App';

const EditCardsForm = ({ cardDataToEdit, setCardDataToEdit, onEditClick, onCancelClick }) => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    const defaultTheme = createTheme();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
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
        <div className='editCardFormDiv' id={theme}>
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="title" required fullWidth id="title" label="Title"
                                    autoFocus value={cardDataToEdit.title} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, title: e.target.value })} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="subtitle" fullWidth id="subtitle" label="Sub title"
                                    autoFocus value={cardDataToEdit.subtitle} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, subtitle: e.target.value })} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required fullWidth id="description" label="Description"
                                    name="description" value={cardDataToEdit.description} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, description: e.target.value })} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required fullWidth id="phoneCard" label="Phone" type="text"
                                    name="phoneCard" value={cardDataToEdit.phone} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, phone: e.target.value })} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required fullWidth id="emailCard" label="Email Address"
                                    name="emailCard" value={cardDataToEdit.email} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, email: e.target.value })} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth name="web" label="Web" type="web"
                                    id="web" value={cardDataToEdit.web} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, web: e.target.value })} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth name="imgurlCard" label="Img URL" type="url"
                                    id="imgurlCard" value={cardDataToEdit.imgurl} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, imgurl: e.target.value })} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth name="imgaltCard" label="Img ALT" type="text"
                                    id="imgaltCard" value={cardDataToEdit.imgalt} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, imgalt: e.target.value })} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth name="stateCard" label="State" type="text"
                                    id="StateCard" value={cardDataToEdit.state} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, state: e.target.value })} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required fullWidth name="countryCard" label="Country"
                                    type="text" id="countryCard" value={cardDataToEdit.country} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, country: e.target.value })} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required fullWidth name="cityCard" label="City" type="text"
                                    id="cityCard" value={cardDataToEdit.city} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, city: e.target.value })} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required fullWidth name="streetCard" label="Street"
                                    type="text" id="streetCard" value={cardDataToEdit.street} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, street: e.target.value })} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required fullWidth name="houseNumberCard" label="House Number"
                                    type="number" id="houseNumberCard" value={cardDataToEdit.houseNumber} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, houseNumber: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth name="zipCard" label="Zip" type="number"
                                    id="zipCard" value={cardDataToEdit.houseNumber} className='textField'
                                    onChange={(e) => setCardDataToEdit({ ...cardDataToEdit, houseNumber: e.target.value })} />
                            </Grid></Grid>
                        <Button
                            type="submit" fullWidth variant="contained" className='formButton'
                            sx={{ mt: 3, mb: 2 }} onClick={() => onEditClick()} >
                            Edit
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Button
                                type="submit" fullWidth variant="contained" className='formButton'
                                sx={{ mt: 3, mb: 2 }} onClick={() => onCancelClick()} >
                                Reset
                            </Button>
                        </Grid></Box></Box>
            </Container>

        </div>
    )
}

export default EditCardsForm
