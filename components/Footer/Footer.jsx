import Link from 'next/link';
import classes from './Footer.module.css';

const Footer = () => (
  <nav className={classes.navLinks}>
    <Link href="/wiki"><a>База знаний</a></Link>
    <Link href="/about"><a>О нас</a></Link>
    <Link href="/contacts"><a>Связаться с нами</a></Link>
    <Link href="/licence"><a>Пользовательское соглашение</a></Link>
  </nav>
);

export default Footer;
