import { ProjectDto } from '@/common/types'
import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { Aside, createStyles, Group, ScrollArea, Title, Text, Image, Space, AspectRatio, Container, Box } from '@mantine/core'
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
            <Aside.Section
                grow
                component={ScrollArea}
                px='xs'
            >
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
            </Aside.Section>

            <Aside.Section
                p='xs'
                sx={{
                    bottom: 0,
                }}
            >
                <FollowProjectButton
                    size='xl'
                    fullWidth
                    status={data.isFollowed}
                    projectId={data.id}
                />
            </Aside.Section>
        </>
    )
}
