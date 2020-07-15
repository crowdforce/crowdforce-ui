import { Button } from '@material-ui/core';
import { useEffect } from 'react';
import useCommonState from 'use-common-state';
import { Skeleton } from '@material-ui/lab';
import classes from './Header.module.css';
import openLoginForm from '../../actions/openLoginForm';
import fetchUser from '../../actions/fetchUser';

const UserButton = () => {
  const [isLoading] = useCommonState('user.isLoading');
  const [username] = useCommonState('user.data.name');

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading && !username) {
    return <Skeleton width="120px" height="36px" />;
  }

  if (username) {
    return <Button href="/user" color="secondary">{username}</Button>;
  }

  return <Button onClick={() => openLoginForm(true)} color="primary" variant="contained">Войти</Button>;
};

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
