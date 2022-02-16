import { Typography, LinearProgress, Button } from '@mui/material';
import { useEffect } from 'react';
import router from 'next/router';
import Page from '../components/Page';
import useApi from '../utils/useApi';

const UserPage = () => {
  const user = useApi('/api/user');

  useEffect(() => {
    user.fetch();
  }, []);

  const handleLogoutClick = () => {
    fetch('/api/logout').then(() => {
      user.fetch();
      router.push('/');
    });
  };

  return (
    <Page>
      {user.isLoading && <LinearProgress style={{ margin: '-20px -60px 16px' }} />}
      {user.data?.name && (
      <>
        <Typography variant="h4" style={{ marginBottom: '20px' }}>{user.data?.name}</Typography>
        <Button onClick={handleLogoutClick} color="primary" variant="contained">Выйти</Button>
      </>
      )}
    </Page>
  );
};

export default UserPage;
