import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface CountryInfo{
    flags : {
        png: string,
        svg: string
    }, 
    capital: string, 
    population: number,
    latlng: number[]
}

interface CapitalWeather{
    temperature: number,
    weather_icons: string[],
    wind_speed: number,
    precip: number
}

const Country: React.FC = () => {
    const { countryName } = useParams<string>();
    
    const [country, setCountry] = useState<CountryInfo | undefined>();
    const [capitalName, setCapitalName] = useState<string | undefined>();
    const [capitalWeather, setCapitalWeather] = useState<CapitalWeather | undefined>();
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(({ data }) => {
            setCountry(data[0])
        })
    }, [countryName]);
    
    const getWeatherInfo = (capitalName: string) => {
        axios.get(`http://api.weatherstack.com/current?access_key=5dba64343b02e74797d1e8e7a37de403&query=${capitalName[0]}`)
        .then(({ data }) => {
            console.log(capitalName[0]);
            setCapitalWeather(data?.current);
        })
    }
    console.log(capitalWeather);
    

    return (
        <div>
            <Grid container spacing={2} sx={{textAlign: 'center'}}>

                <Grid item xs={3} sx={{margin: '200px auto'}}>
                    {
                        country?.population ?
                        <Card sx={{ maxWidth: '100%', textAlign: 'left' }}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={country?.flags?.png}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Capital: {country?.capital}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Population: { country?.population }
                            </Typography>
                            <Box sx={{display: 'flex', justifyContent: 'start', margin: '6px 0px', width: '100%'}}>
                            <Typography sx={{marginRight: '15px'}} variant="body2" color="text.secondary">
                                Population: {country?.latlng[0]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Population: {country?.latlng[1]}
                            </Typography>
                            </Box>
                            {
                                capitalWeather &&
                                <Box>
                                {
                                    <>
                                        <Typography sx={{marginRight: '15px'}} variant="body2" color="text.secondary">
                                        Tempareture: {capitalWeather?.temperature}
                                        </Typography>
                                        <img src={capitalWeather?.weather_icons[0]}></img>
                                        <Typography sx={{marginRight: '15px'}} variant="body2" color="text.secondary">
                                            Wind Spped: {capitalWeather?.wind_speed}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Preciption: {capitalWeather?.precip}
                                        </Typography>
                                    </>
                                }
                                </Box>
                                
                            }
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => getWeatherInfo(country?.capital)}>Learn More</Button>
                        </CardActions>
                        </Card>
                        :
                        <CircularProgress />
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default Country;