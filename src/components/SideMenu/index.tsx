import { createStyles, Stack } from "@mantine/core"

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
        padding: theme.spacing.xs,
    },
}))

export const SideMenu: React.FC<ProjectSideMenuLayoutProps> = ({ children, extra }) => {
    const { classes: s } = useStyles()

    return (
        <Stack
            className={s.container}
            justify="space-between"
            sx={{
                overflow: "hidden",
            }}
        >
            <Stack
                align="center"
                spacing={"xs"}
            >
                {children}
            </Stack>

            <Stack
                spacing={2}
                sx={{
                    position: "sticky",
                }}
            >
                {extra}
            </Stack>
        </Stack>
    )
}
