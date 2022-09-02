import { ProjectDto } from '@/common/types'
import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { Aside, createStyles, Group, ScrollArea, Title } from '@mantine/core'
import { IconUsers } from '@tabler/icons'
import React, { useContext, } from 'react'
import ProjectAsideTab from '../ProjectAsideTab'
import { ProjectSideMenuIds } from '../ProjectSideMenu'

type ProjectAsideProps = {
    data: ProjectDto
}
type AsideTabComponents = Record<Exclude<ProjectSideMenuIds, 'aside'>, React.ReactNode>

const useStyles = createStyles((theme) => ({
    aside: {
        position: 'sticky',
        borderRadius: theme.radius.lg,
        margin: theme.spacing.xs,
    }
}))

const asideTabComponents: AsideTabComponents = {
    'info': <ProjectAsideTab.Info />,
    'tasks': <div />,
    'add-task': <div />,
    'edit': <ProjectAsideTab.Edit />,
}

export const ProjectAside: React.FC<ProjectAsideProps> = ({ data }) => {
    const { classes: s, cx } = useStyles()
    const { open, openId } = useContext(ProjectSideMenuContext)

    return (
        <Aside
            sx={{
                transform: `translateX(${open ? 0 : '-100%'})`,
                zIndex: open ? 100 : -1,
            }}
            height='calc(100% - 20px)'
            width={{
                base: 'calc(100% - 50px)',
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
                        {data.title}
                    </Title>
                    <Group
                        noWrap
                        grow
                        spacing='xs'
                        sx={{
                            flex: '0 0 auto',
                        }}
                    >
                        <IconUsers />
                        <div>
                            69
                        </div>
                    </Group>
                </Group>
            </Aside.Section>
            {React.cloneElement(asideTabComponents[openId], { data })}
        </Aside>
    )
}
