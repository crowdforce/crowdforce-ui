import { AppHeader } from "@/components/AppHeader"
import { AppShell, Burger, MediaQuery, Navbar } from "@mantine/core"
import { useState } from "react"
import { AppMenu } from "@/components/AppMenu"
import dynamic from "next/dynamic"
import { UserButtonProps } from "@/components/UserButton"
import { AppFooter } from "../AppFooter"

const UserButton = dynamic<UserButtonProps>(
    () => import("@/components/UserButton").then(x => x.UserButton),
    {
        ssr: false,
    }
)

export type AppProps = {
    children?: React.ReactNode
    showFooter: boolean
}

export const App: React.FC<AppProps> = ({ children, showFooter }) => {
    const [opened, setOpened] = useState(false)

    return (
        <AppShell
            fixed={false}
            styles={theme => ({
                main: {
                    overflow: "hidden",
                    padding: 0,
                },
                body: {
                    minHeight: "calc(100vh - 60px * 2)", // fullscreen - header - footer
                    "& > nav": {
                        minHeight: "calc(100vh - 60px)",
                    },
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
                <MediaQuery largerThan='xs' styles={{ display: "none" }}>
                    <Navbar
                        hidden={!opened}
                        fixed
                        sx={{
                            zIndex: 101,
                        }}
                    >
                        <AppMenu vertical />
                        <div style={{
                            width: "fit-content",
                            margin: "0 20px",
                            bottom: 0,
                        }}>
                            <UserButton />
                        </div>
                    </Navbar>
                </MediaQuery>
            )}
            footer={!showFooter ? undefined : (
                <>
                    <div style={{
                        height: "8rem",
                    }} />
                    <AppFooter />
                </>
            )}
        >
            {children}
        </AppShell>
    )
}
