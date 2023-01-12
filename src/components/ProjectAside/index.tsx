import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { Aside, createStyles, Group, Title } from "@mantine/core"
import { IconUsers } from "@tabler/icons"
import { useContext } from "react"

export type ProjectAsideProps = {
    title: string
    followers: number
    children: React.ReactNode
}

const useStyles = createStyles((theme) => ({
    aside: {
        position: "absolute",
        top: theme.spacing.xs,
        right: -theme.spacing.xs,
        borderRadius: theme.radius.lg,
    },
}))

export const ProjectAside: React.FC<ProjectAsideProps> = ({ title, followers, children }) => {
    const { classes: s } = useStyles()
    const { open } = useContext(ProjectSideMenuContext)

    return (
        <Aside
            sx={{
                transform: `translateX(${open ? "100%" : 0})`,
                zIndex: open ? 3 : -1,
            }}
            height='calc(100% - 8px * 2)'
            width={{
                base: "calc(100vw - 48px - 8px * 4)",
                xs: 520,
            }}
            className={s.aside}
        >
            <Aside.Section
                p='md'
                pt='sm'
            >
                <Group
                    position='apart'
                    align='center'
                    noWrap
                >
                    <Title order={1}
                        sx={{
                            overflow: "hidden",
                        }}
                    >
                        {title}
                    </Title>
                    <Group
                        noWrap
                        grow
                        spacing='xs'
                        sx={{
                            flex: "0 0 auto",
                        }}
                    >
                        <IconUsers />
                        <div>
                            {followers}
                        </div>
                    </Group>
                </Group>
            </Aside.Section>

            <Aside.Section
                grow
                px="md"
                pb="md"
            >
                {children}
            </Aside.Section>
        </Aside>
    )
}
