import classes from './Header.module.css';
import UserButton from '../UserButton';
import { UserAvatar } from '@/components/UserAvatar';
import { useSession } from 'next-auth/react';

const Header = () => {
  const session = useSession()
  const isAuthenticated = session.status === 'authenticated'

  return (
    <div className={classes.root}>
      <a className={classes.logo} href="/">Crowd force</a>
      <nav className={classes.navLinks}>
        <a href="/wiki">База знаний</a>
        <a href="/about">О нас</a>
      </nav>
      <div className={classes.userButton}>
        <UserButton />
      </div>

      {!isAuthenticated ? null : (
        <div>
          <UserAvatar
            src={session.data?.user?.image!}
          />
        </div>
      )}
    </div>
  )
}

export default Header
