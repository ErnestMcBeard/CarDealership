import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { getSuggestedQuery } from '@testing-library/dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function App() {
  const classes = useStyles();

  const [make, setMake] = React.useState('');
  const [color, setColor] = React.useState('');
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(100000);
  const [minMiles, setMinMiles] = React.useState(0);
  const [maxMiles, setMaxMiles] = React.useState(100000);
  const [hasSunroof, setHasSunroof] = React.useState('');
  const [hasFourWheelDrive, setHasFourWheelDrive] = React.useState('');
  const [hasPowerWindows, setHasPowerWindows] = React.useState('');
  const [hasNavigation, setHasNavigation] = React.useState('');
  const [hasHeatedSeats, setHasHeatedSeats]  = React.useState('');

  const [results, setResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  async function search() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        make: make,
        color: color,
        minPrice: minPrice,
        maxPrice: maxPrice,
        minMiles: minPrice,
        maxPrice: maxPrice,
        hasSunroof: hasSunroof === '' ? null : hasSunroof,
        hasFourWheelDrive: hasFourWheelDrive === '' ? null : hasFourWheelDrive,
        hasPowerWindows: hasPowerWindows === '' ? null : hasPowerWindows,
        hasNavigation: hasNavigation === '' ? null : hasNavigation,
        hasHeatedSeats: hasHeatedSeats === '' ? null : hasHeatedSeats
      })
    };
    await fetch('https://localhost:44364/api/car/query', requestOptions)
      .then(response => response.json())
      .then(results => this.setResults(results))
      .then(() => this.setIsLoading(false));
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Hwy Car Sales
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Search Cars
          </Typography>
          <React.Fragment>
            <FormControl className={classes.formControl}>
              <TextField
                name="make"
                label="Make"
                value={make}
                onChange={event => setMake(event.target.value)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Color</InputLabel>
              <Select
                value={color}
                onChange={event => setColor(event.target.value)}
              >
                <MenuItem value={''}>No Preference</MenuItem>
                <MenuItem value={'red'}>Red</MenuItem>
                <MenuItem value={'white'}>White</MenuItem>
                <MenuItem value={'gray'}>Gray</MenuItem>
                <MenuItem value={'silver'}>Silver</MenuItem>
                <MenuItem value={'black'}>Black</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                type="number"
                label="Min Price"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                type="number"
                label="Max Price"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                type="number"
                label="Min Mileage"
                value={minMiles}
                onChange={(event) => setMinMiles(event.target.value)} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                type="number"
                label="Max Mileage"
                value={maxMiles}
                onChange={(event) => setMaxMiles(event.target.value)} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Sunroof</InputLabel>
              <Select
                value={hasSunroof}
                onChange={event => setHasSunroof(event.target.value)}
              >
                <MenuItem value={''}>No Preference</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>4WD</InputLabel>
              <Select
                value={hasFourWheelDrive}
                onChange={event => setHasFourWheelDrive(event.target.value)}
              >
                <MenuItem value={''}>No Preference</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Power Windows</InputLabel>
              <Select
                value={hasPowerWindows}
                onChange={event => setHasPowerWindows(event.target.value)}
              >
                <MenuItem value={''}>No Preference</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Navigation</InputLabel>
              <Select
                value={hasNavigation}
                onChange={event => setHasNavigation(event.target.value)}
              >
                <MenuItem value={''}>No Preference</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Heated Seats</InputLabel>
              <Select
                value={hasHeatedSeats}
                onChange={event => setHasHeatedSeats(event.target.value)}
              >
                <MenuItem value={''}>No Preference</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </React.Fragment>
          <React.Fragment>
            <div className={classes.buttons}>
              <Button 
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => search()}>
                Search
              </Button>
            </div>
          </React.Fragment>
          <React.Fragment>
            
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
