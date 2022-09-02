import { AppHeader } from '@/components/AppHeader'
import { AppShell, Burger, MediaQuery, Navbar } from '@mantine/core'
import { useState } from 'react'
import { AppMenu } from '@/components/AppMenu'
import dynamic from 'next/dynamic'
import { UserButtonProps } from '@/components/UserButton'
import { AppFooter } from '../AppFooter'
import { useRouter } from 'next/router'
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
    const router = useRouter()
    const isProjectPage = router.pathname === '/project/[projectId]'
    const noFooter = isProjectPage

    return (
        <AppShell
            fixed={false}
            styles={theme => ({
                main: {
                    overflow: 'hidden',
                    padding: isProjectPage ? 0 : theme.spacing.md,
                },
                body: {
                    minHeight: 'calc(100vh - 60px * 2)', // fullscreen - header - footer
                    '& > nav': {
                        minHeight: 'calc(100vh - 60px)',
                    }
                }
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
                        fixed
                        sx={{
                            zIndex: 101,
                        }}
                    >
                        <AppMenu vertical />
                        <div style={{
                            width: ' fit-content',
                            margin: '0 20px',
                            bottom: 0,
                        }}>
                            <UserButton />
                        </div>
                    </Navbar>
                </MediaQuery>
            )}
            footer={noFooter ? undefined : (
                <AppFooter />
            )}
        >
            {children}
        </AppShell>
    )
}
