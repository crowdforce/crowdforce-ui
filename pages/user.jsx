import { Typography, LinearProgress, Button } from '@material-ui/core';
import useCommonState, { setCommonState } from 'use-common-state';
import { useEffect } from 'react';
import router from 'next/router';
import Page from '../components/Page';
import fetchUser from '../actions/fetchUser';

const UserPage = () => {
  const [isLoading] = useCommonState('user.isLoading');
  const [username] = useCommonState('user.data.name');

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogoutClick = () => {
    fetch('/api/logout').then(() => {
      setCommonState('user', null);
      router.push('/');
    });
  };

  return (
    <Page>
      {isLoading && <LinearProgress style={{ margin: '-20px -60px 16px' }} />}
      {username && (
      <>
        <Typography variant="h4" style={{ marginBottom: '20px' }}>{username}</Typography>
        <Button onClick={handleLogoutClick} color="primary" variant="contained">Выйти</Button>
      </>
      )}
    </Page>
  );
};

export default UserPage;
