import { ProjectDto } from '@/common/types'
import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { Aside, createStyles, Group, ScrollArea, Title, Text, Image, Space, AspectRatio } from '@mantine/core'
import { IconUsers } from '@tabler/icons'
import React, { useContext, } from 'react'
import { FollowProjectButton } from '../FollowProjectButton'
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

export const Info: React.FC<ProjectAsideProps> = ({ data }) => {
    const { classes: s, cx } = useStyles()

    return (
        <>
            <AspectRatio ratio={16 / 9}>
                <Image
                    src={data.imageUrl ?? '/wip.png'}
                />
            </AspectRatio>
            <Space h='xs' />

            <Text>
                {data.description}
            </Text>
            <Space h='xs' />

            <FollowProjectButton
                status={data.isFollowed}
                projectId={data.id}
            />
        </>
    )
}
