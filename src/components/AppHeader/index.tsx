import dynamic from 'next/dynamic'
import { createStyles, Group, Header, MediaQuery } from '@mantine/core'
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

const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
    },
    root: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1160,
    }
}))

export const AppHeader: React.FC<AppHeaderProps> = ({ burger }) => {
    const { classes: s, cx } = useStyles()
    return (
        <Header
            withBorder={false}
            height={60}
            p={'sm'}
            className={s.header}
        >
            <div className={s.root}>
                <Logo />

                <MediaQuery smallerThan='xs' styles={{ display: 'none' }}>
                    <Group>
                        <AppMenu />
                        <UserButton />
                    </Group>
                </MediaQuery>

                <MediaQuery largerThan='xs' styles={{ display: 'none' }}>
                    {burger}
                </MediaQuery>
            </div>
        </Header>
    )

}
