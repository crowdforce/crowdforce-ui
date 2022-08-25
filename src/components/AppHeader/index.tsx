import s from './AppHeader.module.css'
import dynamic from 'next/dynamic'
import { Header, MediaQuery } from '@mantine/core'
import { Logo } from './Logo'
import { AppMenu } from '../AppMenu'
import { UserButtonProps } from '@/components/UserButton'

const UserButton = dynamic<UserButtonProps>(
    () => import('@/components/UserButton').then(x => x.UserButton),
    {
        ssr: false,
    }
)

type AppHeaderProps = {
    burger: React.ReactNode
}

export const AppHeader: React.FC<AppHeaderProps> = ({ burger }) => (
    <Header
        height={60}
        p={'sm'}
    >
        <div className={s.root}>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                {burger}
            </MediaQuery>

            <Logo />

            <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
                <div className={s.centered}>
                    <AppMenu />
                </div>
            </MediaQuery>

            <UserButton />
        </div>
    </Header>
)
