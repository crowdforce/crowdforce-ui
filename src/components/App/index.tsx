import { AppHeader } from '@/components/AppHeader'
import { AppShell, Burger, MediaQuery, Navbar } from '@mantine/core'
import { useState } from 'react'
import Footer from 'components/Footer/Footer'
import { AppMenu } from '@/components/AppMenu'
import { useRouter } from 'next/router'

export type AppProps = {
    children?: React.ReactNode
}

export const App: React.FC<AppProps> = ({ children }) => {
    const [opened, setOpened] = useState(false)
    const router = useRouter()
    const isIndexPage = router.asPath === '/'

    return (
        <AppShell
            styles={theme => ({
                root: {
                    background: isIndexPage ? '#ECF2F6' : theme.white,
                },
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
