import React, {useState, useEffect, createRef} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails'

const List = ({places, childClicked, isLoading, type, setType, rating, setRating}) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
      }, [places]);

    return (
        <div className = {classes.container}>
            <div className = {classes.text} >
                <Typography variant="h5">
                    Restaurants, Hotels and Attractions...
                </Typography>
            </div>
            { isLoading ? (
                <div className = {classes.Loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
            <FormControl className = {classes.formControl}>
                <InputLabel style={{color:'white'}}> Avenue Type </InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)} style={{color:'white'}}>
                    <MenuItem className={classes.optionText} value="restaurants"> Restaurants </MenuItem> 
                    <MenuItem className={classes.optionText} value="hotels"> Hotels </MenuItem> 
                    <MenuItem className={classes.optionText} value="attractions"> Attractions </MenuItem> 
                </Select>
            </FormControl>
            &nbsp; &nbsp; &nbsp;
            <FormControl className = {classes.formControl}>
                <InputLabel style={{color:'white'}}> Rating </InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)} style={{color:'white'}}>
                    <MenuItem className={classes.optionText} value={0}> All </MenuItem> 
                    <MenuItem className={classes.optionText} value={3}> Above 3.0 </MenuItem> 
                    <MenuItem className={classes.optionText} value={4}> Above 4.0 </MenuItem> 
                    <MenuItem className={classes.optionText} value={4.5}> Above 4.5 </MenuItem> 
                </Select>
            </FormControl>
            <Grid container spacing={3} className = {classes.list}>
                {places?.map((place, i) => (
                    <Grid ref={elRefs[i]} item key={i} xs={12}>
                        <PlaceDetails 
                        place={place}
                        selected={Number(childClicked) === i}
                        refProp={elRefs[i]}
                        />
                    </Grid>
                ))} 
            </Grid>   
            </> 
    )}    
        </div>
    );
}

export default List;