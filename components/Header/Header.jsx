import { Button } from '@material-ui/core';
import { useEffect } from 'react';
import useCommonState from 'use-common-state';
import { Skeleton } from '@material-ui/lab';
import TelegramLoginButton from 'react-telegram-login';
import classes from './Header.module.css';
import openLoginForm from '../../actions/openLoginForm';
import fetchUser from '../../actions/fetchUser';
import ajax from '../../utils/ajax';

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

const Header = () => {
  const handleTelegramResponse = (user) => {
    alert(JSON.stringify(user, null, 2));
    // ajax.get(`/api/auth?auth_date=${user.auth_date}&id=${user.id}&hash=${user.hash}`);
  };

  return (
    <div className={classes.root}>
      <a className={classes.logo} href="/">Crowd force</a>
      <nav className={classes.navLinks}>
        <a href="/wiki">База знаний</a>
        <a href="/about">О нас</a>
      </nav>
      <div className={classes.userButton}>
        <TelegramLoginButton dataOnauth={handleTelegramResponse} botName={process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME} />
      </div>
    </div>
  );
};

export default Header;
