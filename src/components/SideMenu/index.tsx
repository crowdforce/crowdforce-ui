import { createStyles, Stack } from "@mantine/core"
import React from "react"

type ProjectSideMenuLayoutProps = {
    children: React.ReactNode
    extra?: React.ReactNode
}

const useStyles = createStyles((theme) => ({
    container: {
        position: "relative",
        height: "calc(100vh - 60px)",
        background: theme.colors.dark[7],
        left: 0,
        top: 0,
        paddingTop: 2,
    },
}))

export const SideMenu: React.FC<ProjectSideMenuLayoutProps> = ({ children, extra }) => {
    const { classes: s } = useStyles()

    return (
        <Stack
            className={s.container}
            px={2}
            justify="space-between"
            sx={{
                overflow: "hidden",
            }}
        >
            <Stack
                align="center"
                spacing={2}
            >
                {children}
            </Stack>

            <Stack
                spacing={2}
                sx={{
                    position: "sticky",
                    bottom: 2,
                }}
            >
                {extra}
            </Stack>
        </Stack>
    )

}
