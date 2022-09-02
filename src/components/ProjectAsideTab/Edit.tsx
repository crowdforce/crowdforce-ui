import { AdminProjectDto, ProjectDto } from '@/common/types'
import { Aside, createStyles, ScrollArea, } from '@mantine/core'
import React from 'react'
import useSWR from 'swr'

type ProjectAsideProps = {
    data?: ProjectDto
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
    const { data, error } = useSWR<AdminProjectDto>(`/api/admin/projects/${dataPublic?.id}`)

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
