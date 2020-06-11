import Link from 'next/link';
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
      <Link href="/wiki"><a>База знаний</a></Link>
      <Link href="/about"><a>О нас</a></Link>
    </nav>
    <div className={classes.user}>
      <Button color="primary" variant="contained">Войти</Button>
    </div>
  </Toolbar>
);

export default Header;
