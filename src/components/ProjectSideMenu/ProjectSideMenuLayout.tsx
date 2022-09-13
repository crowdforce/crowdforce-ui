import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { createStyles, Stack } from "@mantine/core"
import React, { useContext } from "react"

type ProjectSideMenuLayoutProps = {
    topButtons: React.ReactNode
    bottomButtons: React.ReactNode
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

export const ProjectSideMenuLayout: React.FC<ProjectSideMenuLayoutProps> = ({ topButtons, bottomButtons }) => {
    const { classes: s, cx } = useStyles()

    const { wide } = useContext(ProjectSideMenuContext)

    return (
        <Stack
            className={s.container}
            px={2}
            justify='space-between'
            sx={{
                width: wide ? 260 : 48,
                overflow: "hidden",
            }}
        >
            <Stack
                align='center'
                spacing={2}
            >
                {topButtons}
            </Stack>

            <Stack
                spacing={2}
                sx={{
                    position: "sticky",
                    bottom: 2,
                }}
            >
                {bottomButtons}
            </Stack>
        </Stack>
    )

}
