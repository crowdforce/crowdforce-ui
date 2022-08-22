import s from './AppHeader.module.css'
import dynamic from 'next/dynamic'
import { Header } from '@mantine/core'
import { Logo } from './Logo'

const UserButton = dynamic<React.ReactNode>(
    () => import('@/components/UserButton').then(x => x.UserButton),
    {
        ssr: false,
    }
)

export const AppHeader = () => (
    <Header
        height={60}
        p={'sm'}
    >
        <div className={s.root}>
            <Logo />
            <nav className={s.navLinks}>
                <a href="/wiki">База знаний</a>
                <a href="/about">О нас</a>
            </nav>
            <UserButton />
        </div>
    </Header>
)
