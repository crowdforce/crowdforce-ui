import s from './AppHeader.module.css'
import dynamic from 'next/dynamic'
import { Header } from '@mantine/core'
import { Logo } from './Logo'
import { AppMenu } from '../AppMenu'
import { UserButtonProps } from '@/components/UserButton'

const UserButton = dynamic<UserButtonProps>(
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
            <AppMenu />
            <UserButton />
        </div>
    </Header>
)
