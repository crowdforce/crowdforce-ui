import { AdminProjectDto, ProjectDto } from '@/common/types'
import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { Aside, createStyles, Group, ScrollArea, Title, Text, Stack, Card } from '@mantine/core'
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

export const Tasks: React.FC<ProjectAsideProps> = ({ data: dataPublic }) => {
    const { classes: s, cx } = useStyles()
    const { data, error } = useSWR<AdminProjectDto>(`/api/admin/projects/${dataPublic.id}`)

    return (
        <Aside.Section
            grow
            component={ScrollArea}
            px='xs'
        >
            <Stack
                spacing='xs'
            >
                {[1, , 1, 1, 1, , 1, , 1, 1,].map((x, i) => (
                    <Card
                        withBorder
                    >
                        Задаченька
                    </Card>
                ))}
            </Stack>
        </Aside.Section>
    )
}
