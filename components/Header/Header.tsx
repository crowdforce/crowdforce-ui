import classes from './Header.module.css';
import UserButton from '../UserButton';

const Header = () => (
  <div className={classes.root}>
    <a className={classes.logo} href="/">Crowd force</a>
    <nav className={classes.navLinks}>
      <a href="/wiki">База знаний</a>
      <a href="/about">О нас</a>
    </nav>
    <div className={classes.userButton}>
      <UserButton />
    </div>
  </div>
);

export default Header;
