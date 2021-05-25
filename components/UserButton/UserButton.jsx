import { Button } from '@material-ui/core';
import { useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import { observer } from 'mobx-react-lite';
import useApi from '../../utils/useApi';
import ajax from '../../utils/ajax';

const UserButton = () => {
  const user = useApi({
    url: '/api/auth/user',
  });
  const isLoading = user.isLoading ?? true;
  const username = user.data?.name;

  useEffect(() => {
    const loginController = new AbortController();

    window.addEventListener('message', ({ data }) => {
      if (data.type === 'login' && data.id) {
        console.log(data);
        const query = new URLSearchParams();
        Object.keys(data).forEach((key) => {
          if (key !== 'type') {
            query.set(key, data[key]);
          }
        });
        query.set('redirect_to', window.location.href);
        ajax.get(`/api/auth?${query.toString()}`).then(() => {
          user.fetch();
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
    user.fetch();
  }, []);

  if (isLoading) {
    return <Skeleton width="120px" height="40px" />;
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
