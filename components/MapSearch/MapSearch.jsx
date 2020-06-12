import { Button, Paper } from '@material-ui/core';
import classes from './MapSearch.module.css';

const MapSearch = () => (
  <Paper className={classes.root} elevation={3}>
    <input className={classes.input} />
    <Button color="primary" variant="contained" disableElevation className={classes.button}>Найти проект</Button>
  </Paper>
);

export default MapSearch;
