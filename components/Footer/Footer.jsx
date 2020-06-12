import classes from './Footer.module.css';

const Footer = () => (
  <nav className={classes.navLinks}>
    <a href="/wiki">База знаний</a>
    <a href="/about">О нас</a>
    <a href="/contacts">Связаться с нами</a>
    <a href="/licence">Пользовательское соглашение</a>
  </nav>
);

export default Footer;
