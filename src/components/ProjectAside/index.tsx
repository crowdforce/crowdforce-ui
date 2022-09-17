import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { Aside, createStyles, Group, Title } from "@mantine/core"
import { IconUsers } from "@tabler/icons"
import { cloneElement, useContext } from "react"
import ProjectAsideTab from "../ProjectAsideTab"
import { ProjectSideMenuIds } from "../ProjectSideMenu"

export type ProjectAsideProps = {
    title: string
    followers: number
}

type AsideTabComponents = Record<Exclude<ProjectSideMenuIds, "aside">, React.ReactElement>

const useStyles = createStyles((theme) => ({
    aside: {
        position: "absolute",
        top: 8,
        right: -8,
        borderRadius: theme.radius.lg,
    },
}))

const asideTabComponents: AsideTabComponents = {
    "info": <ProjectAsideTab.Info />,
    "tasks": <ProjectAsideTab.Tasks />,
    "add-task": <ProjectAsideTab.AddTask />,
    "edit": <ProjectAsideTab.Edit />,
}

export const ProjectAside: React.FC<ProjectAsideProps> = ({ title, followers }) => {
    const { classes: s } = useStyles()
    const { open, openId } = useContext(ProjectSideMenuContext)

    return (
        <Aside
            sx={{
                transform: `translateX(${open ? "100%" : 0})`,
                zIndex: open ? 3 : -1,
            }}
            height='calc(100% - 8px * 2)'
            width={{
                base: "calc(100vw - 48px - 8px * 2)",
                xs: 520,
            }}
            className={s.aside}
        >
            <Aside.Section
                p='xs'
                py='md'
            >
                <Group
                    position='apart'
                    align='start'
                    noWrap
                >
                    <Title order={4}>
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

            {cloneElement(asideTabComponents[openId])}
        </Aside>
    )
}
