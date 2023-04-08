import React, {useState, useEffect} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header';
import Map from './components/Map/Map';
import List from './components/List/List';
import {getPlacesData} from './api';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null)

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState([]);

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('0');
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [isLoading, setIsLoading] = useState(false)
    const [autocomplete, setAutocomplete] = useState(null);

    useEffect (() => {
        navigator.geolocation.getCurrentPosition(( {coords : {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        })
    })

    useEffect(() => {
        const filtered = places?.filter((place) => Number(place.rating) > rating);
    
        setFilteredPlaces(filtered);
      }, [rating]);

    useEffect (() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true);

            getPlacesData(type, bounds.sw, bounds.ne).then((data)=> {
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilteredPlaces([]);
                setRating('');
                setIsLoading(false);
            });
        }
    }, [type, bounds]);
    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng });
  };

    return (
        <>
            <CssBaseline />
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <hr style={{color:'white', border:'none', backgroundColor:'white', height:'0.1px'}}></hr>
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                    places={filteredPlaces?.length ? filteredPlaces : places}
                    childClicked = {childClicked} 
                    isLoading = {isLoading}
                    type = {type}
                    setType = {setType}
                    rating = {rating}
                    setRating = {setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                    setCoordinates={setCoordinates} 
                    setBounds={setBounds} 
                    coordinates={coordinates}
                    places={filteredPlaces?.length ? filteredPlaces : places}
                    setChildClicked={setChildClicked}/>
                </Grid>
            </Grid>
        </>
    );
}

export default App;