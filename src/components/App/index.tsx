import { AppHeader } from '@/components/AppHeader'
import { AppShell, Burger, MediaQuery, Navbar } from '@mantine/core'
import { useState } from 'react'
import { AppMenu } from '@/components/AppMenu'
import { Footer } from '@/components/Footer'

export type AppProps = {
    children?: React.ReactNode
}

export const App: React.FC<AppProps> = ({ children }) => {
    const [opened, setOpened] = useState(false)

    return (
        <AppShell
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
                <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                    <Navbar
                        hidden={!opened}
                    >
                        <AppMenu vertical />
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
