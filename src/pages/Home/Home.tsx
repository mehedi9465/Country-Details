import { Button, Grid, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const countryRef = useRef<HTMLInputElement>(null);
    const [countryName, setCountryName] = useState< string | undefined >();
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/${countryName}`)
    }

    const handleOnchange = () => {
        setCountryName(countryRef.current?.value);
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6} sx={{margin: '200px auto'}}>
                    <input style={{"display": "block", "width": "100%", "padding": "10px 5px", "fontSize": "18px"}} type='text' ref={countryRef} placeholder='Enter Country Name' onChange={handleOnchange}/>
                    {
                        countryName?
                        <Button sx={{margin: '25px 0px'}} variant="contained" onClick={handleSearch}>Search</Button>
                        :
                        <Button sx={{margin: '25px 0px'}} disabled variant="contained" onClick={handleSearch}>Search</Button>
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;