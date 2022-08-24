import s from './AppHeader.module.css'
import dynamic from 'next/dynamic'
import { Burger, Header, MediaQuery } from '@mantine/core'
import { Logo } from './Logo'
import { AppMenu } from '../AppMenu'
import { UserButtonProps } from '@/components/UserButton'
import React, { Dispatch, SetStateAction } from 'react'

const UserButton = dynamic<UserButtonProps>(
    () => import('@/components/UserButton').then(x => x.UserButton),
    {
        ssr: false,
    }
)

type AppHeaderProps = {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
}

export const AppHeader: React.FC<AppHeaderProps> = ({ opened, setOpened }) => (
    <Header
        height={60}
        p={'sm'}
    >
        <div className={s.root}>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <Burger
                    opened={opened}
                    onClick={() => setOpened(!opened)}
                />
            </MediaQuery>

            <Logo />

            <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
                <div>
                    <AppMenu />
                </div>
            </MediaQuery>

            <UserButton />
        </div>
    </Header>
)
