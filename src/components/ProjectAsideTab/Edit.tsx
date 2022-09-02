import { AdminProjectDto, ProjectDto } from '@/common/types'
import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { Aside, createStyles, Group, ScrollArea, Title, Text, Stack } from '@mantine/core'
import { IconUsers } from '@tabler/icons'
import React, { useContext, } from 'react'
import useSWR from 'swr'
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

export const Edit: React.FC<ProjectAsideProps> = ({ data: dataPublic }) => {
    const { classes: s, cx } = useStyles()
    const { data, error } = useSWR<AdminProjectDto>(`/api/admin/projects/${dataPublic.id}`)

    return (
        <Aside.Section
            grow
            component={ScrollArea}
            px='xs'
        >
            PUBLIC DATA
            <pre>
                {JSON.stringify(dataPublic, null, 3)}
            </pre>
            ADMIN DATA
            <pre>
                {JSON.stringify(data, null, 3)}
            </pre>
        </Aside.Section>
    )
}
