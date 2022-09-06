import { ProjectDto } from '@/common/types'
import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { Aside, createStyles, Group, Title } from '@mantine/core'
import { IconUsers } from '@tabler/icons'
import React, { useContext, } from 'react'
import ProjectAsideTab from '../ProjectAsideTab'
import { ProjectSideMenuIds } from '../ProjectSideMenu'

type ProjectAsideProps = {
    data: ProjectDto
}
type AsideTabComponents = Record<Exclude<ProjectSideMenuIds, 'aside'>, React.ReactElement<ProjectAsideProps>>

const useStyles = createStyles((theme) => ({
    aside: {
        position: 'absolute',
        top: 2,
        right: -2,
        borderRadius: theme.radius.lg,
    }
}))

const asideTabComponents: AsideTabComponents = {
    'info': <ProjectAsideTab.Info />,
    'tasks': <ProjectAsideTab.Tasks />,
    'add-task': <div />,
    'edit': <ProjectAsideTab.Edit />,
}

export const ProjectAside: React.FC<ProjectAsideProps> = ({ data }) => {
    const { classes: s, cx } = useStyles()
    const { open, openId } = useContext(ProjectSideMenuContext)

    return (
        <Aside
            sx={{
                transform: `translateX(${open ? '100%' : 0})`,
                zIndex: open ? 3 : -1,
            }}
            height='calc(100% - 4px)'
            width={{
                base: 'calc(100vw - 48px - 2px  * 2)',
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
