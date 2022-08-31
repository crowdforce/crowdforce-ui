import { AppHeader } from '@/components/AppHeader'
import { AppShell, Burger, MediaQuery, Navbar } from '@mantine/core'
import { useState } from 'react'
import Footer from 'components/Footer/Footer'
import { AppMenu } from '@/components/AppMenu'
import dynamic from 'next/dynamic'
import { UserButtonProps } from '@/components/UserButton'
const UserButton = dynamic<UserButtonProps>(
    () => import('@/components/UserButton').then(x => x.UserButton),
    {
        ssr: false,
    }
)

export type AppProps = {
    children?: React.ReactNode
}

export const App: React.FC<AppProps> = ({ children }) => {
    const [opened, setOpened] = useState(false)

    return (
        <AppShell
            styles={theme => ({
                main: {
                    overflow: 'hidden',
                },
            })}
            header={(
                <AppHeader
                    burger={(
                        <Burger
                            opened={opened}
                            onClick={() => setOpened(!opened)}
                        />
                    )}
                />
            )}
            navbar={(
                <MediaQuery largerThan='xs' styles={{ display: 'none' }}>
                    <Navbar
                        hidden={!opened}
                    >
                        <AppMenu vertical />
                        <MediaQuery largerThan='xs' styles={{ display: 'none' }}>
                            <div style={{
                                width: ' fit-content',
                                margin: '0 20px',
                                bottom: 0,
                            }}>
                                <UserButton />
                            </div>
                        </MediaQuery>
                    </Navbar>
                </MediaQuery>
            )}
            footer={(
                <Footer />
            )}
        >
            {children}
        </AppShell>
    )
}
