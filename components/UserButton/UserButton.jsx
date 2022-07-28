import { Avatar, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const UserButton = () => {
  const botId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID
  const session = useSession()
  const isLoading = session.status === 'loading'
  const isAuthenticated = session.status === 'authenticated'

  useEffect(() => {
    const loginController = new AbortController();

    window.addEventListener('message', async ({ data }) => {
      if (data.type === 'login' && data.id) {
        const query = new URLSearchParams();
        const cred = {};
        Object.keys(data).forEach((key) => {
          if (key !== 'type') {
            query.set(key, data[key]);
            cred[key] = data[key];
          }
        });

        signIn('credentials', {
          redirect: '/',
          ...cred,
        });
      }
    }, {
      signal: loginController.signal,
    });

    return () => {
      loginController.abort();
    };
  }, []);

  if (isLoading) {
    return <Skeleton style={{ width: '120px', display: 'inline-block' }} width="120px" height="40px" />;
  }

  if (isAuthenticated) {
    return (
      <button onClick={() => signOut()}>
        sign out
      </button>
    );
  }

  return (
    <iframe
      frameBorder="0"
      scrolling="no"
      title="login"
      width="100"
      height="36"
      src={`https://crowdforce.ru/loginButton.html?bot_id=${botId}&origin=${window.location.origin}`}
    />
  );
};

export default UserButton
