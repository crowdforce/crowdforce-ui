import { Button, Toolbar } from '@material-ui/core';
import classes from './Header.module.css';

const Header = () => (
  <Toolbar className={classes.root}>
    <div className={classes.logo}>
      Crowd force
    </div>
    <div className={classes.city}>
      Питер
    </div>
    <nav className={classes.navLinks}>
      <a href="/wiki">База знаний</a>
      <a href="/about">О нас</a>
    </nav>
    <div className={classes.user}>
      <Button color="primary" variant="contained">Войти</Button>
    </div>
  </Toolbar>
);

export default Header;
