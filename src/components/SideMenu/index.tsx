import { Box, createStyles, Stack } from "@mantine/core"

type ProjectSideMenuLayoutProps = {
    wide: boolean
    children: React.ReactNode
    extra?: React.ReactNode
}

const useStyles = createStyles((theme) => ({
    container: {
        position: "relative",
        height: "calc(100vh - 60px)",
        background: theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.dark[7],
        left: 0,
        top: 0,
        padding: theme.spacing.sm,
    },
}))

export const SideMenu: React.FC<ProjectSideMenuLayoutProps> = ({ children, extra, wide }) => {
    const { classes: s } = useStyles()

    return (
        <Box
            sx={{
                width: wide ? 260 : 64,
            }}
        >
            <Stack
                className={s.container}
                justify="space-between"
                sx={{
                    overflow: "hidden",
                }}
            >
                <Stack
                    align="center"
                    spacing={"sm"}
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
        </Box>
    )
}
