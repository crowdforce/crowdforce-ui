import { Button } from '@material-ui/core';
import classes from './Header.module.css';
import openLoginForm from '../../actions/openLoginForm';

const Header = () => (
  <div className={classes.root}>
    <a className={classes.logo} href="/">Crowd force</a>
    <div className={classes.city}>
      Челябинск
    </div>
    <nav className={classes.navLinks}>
      <a href="/wiki">База знаний</a>
      <a href="/about">О нас</a>
    </nav>
    <div className={classes.user}>
      <Button onClick={() => openLoginForm(true)} color="primary" variant="contained">Войти</Button>
    </div>
  </div>
);

export default Header;
