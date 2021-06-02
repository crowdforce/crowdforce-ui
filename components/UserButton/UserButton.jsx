import { Button } from '@material-ui/core';
import { useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import { observer } from 'mobx-react-lite';
import useApi from '../../utils/useApi';
import ajax from '../../utils/ajax';

const UserButton = () => {
  const userApi = useApi('/api/auth/user');
  const isLoading = userApi.isLoading ?? true;
  const username = userApi.data?.name;

  useEffect(() => {
    const loginController = new AbortController();

    window.addEventListener('message', ({ data }) => {
      if (data.type === 'login' && data.id) {
        const query = new URLSearchParams();
        Object.keys(data).forEach((key) => {
          if (key !== 'type') {
            query.set(key, data[key]);
          }
        });
        query.set('redirect_to', window.location.href);
        ajax.get(`/api/auth?${query.toString()}`).then(() => {
          userApi.fetch();
        });
      }
    }, {
      signal: loginController.signal,
    });

    return () => {
      loginController.abort();
    };
  }, []);

  useEffect(() => {
    userApi.fetch();
  }, []);

  if (isLoading) {
    return <Skeleton style={{ width: '120px', display: 'inline-block' }} width="120px" height="40px" />;
  }

  if (username) {
    return <Button href="/user" color="secondary">{username}</Button>;
  }

  return (
    <iframe
      frameBorder="0"
      scrolling="no"
      title="login"
      width="100"
      height="36"
      src={`https://crowdforce.ru/loginButton.html?bot_id=${process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID}&origin=${window.location.origin}`}
    />
  );
};

export default observer(UserButton);
