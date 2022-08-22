import s from './AppHeader.module.css'
import dynamic from 'next/dynamic'
import { Header } from '@mantine/core'

const UserButton = dynamic<React.ReactNode>(
    () => import('@/components/UserButton').then(x => x.UserButton),
    {
        ssr: false,
    }
)

export const AppHeader = () => (
    <Header
        height={80}
        // p={'md'}
    >
        <div className={s.root}>
            <a className={s.logo} href="/">Crowd force</a>
            <nav className={s.navLinks}>
                <a href="/wiki">База знаний</a>
                <a href="/about">О нас</a>
            </nav>
            <UserButton />
            {/* <div className={s.userButton}>
            </div> */}
        </div>
    </Header>
)
