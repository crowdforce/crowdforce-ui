import { ProjectDto } from '@/common/types'
import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { Aside, createStyles, Group, ScrollArea, Title, Text } from '@mantine/core'
import { IconUsers } from '@tabler/icons'
import React, { useContext, } from 'react'
import { buttons, ProjectSideMenuIds } from '../ProjectSideMenu'

type ProjectAsideProps = {
    data: ProjectDto
}

const useStyles = createStyles((theme) => ({
    aside: {
        position: 'sticky',
        borderRadius: theme.radius.lg,
        margin: theme.spacing.xs,
    }
}))

export const Edit: React.FC<ProjectAsideProps> = ({ data }) => {
    const { classes: s, cx } = useStyles()

    return (
        <Aside.Section
            grow
            component={ScrollArea}
            px='xs'
        >
            EDIT TAB
            <pre>
                {JSON.stringify(data, null, 3)}
            </pre>
        </Aside.Section>
    )
}
