import { ProjectDto } from '@/common/types'
import { Aside, createStyles, Group, ScrollArea, Text, Image, AspectRatio, Stack } from '@mantine/core'
import { IconMapPin } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
import { FollowProjectButton } from '../FollowProjectButton'

type ProjectInfoProps = {
    data?: ProjectDto
}

const useStyles = createStyles((theme) => ({
    icon: {
        flex: '0 0 auto',
        color: theme.colors.gray[6], // dimmed color
    },
    ownerAndLink: {
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        }
    }
}))

export const Info: React.FC<ProjectInfoProps> = ({ data }) => {
    const { classes: s, cx } = useStyles()

    return (
        <>
            <Aside.Section
                grow
                component={ScrollArea}
                px='xs'
            >
                <Stack>
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={data?.imageUrl ?? '/wip.png'}
                            radius='lg'
                        />
                    </AspectRatio>

                    <Group
                        noWrap
                        py='sm'
                        px='sm'
                    >
                        <IconMapPin
                            className={s.icon}
                        />
                        <Stack
                            spacing='xs'
                        >
                            {data?.address && (
                                <Text
                                    color='dimmed'
                                >
                                    {data.address}
                                </Text>
                            )}
                            <Group
                                noWrap
                                spacing='xs'
                                className={s.ownerAndLink}
                            >
                                <Text
                                    color='dimmed'
                                >
                                    {data.admin.name}
                                </Text>
                                {data?.link && (
                                    <Link href={data.link} passHref>
                                        <Text
                                            color='dimmed'
                                            component='a'
                                            underline
                                        >
                                            {data.link}
                                        </Text>
                                    </Link>
                                )}
                            </Group>
                        </Stack>
                    </Group>
                    <Text>
                        {data?.description}
                    </Text>
                </Stack>
            </Aside.Section>

            <Aside.Section
                p='xl'
                sx={{
                    bottom: 0,
                }}
            >
                <FollowProjectButton
                    size='xl'
                    fullWidth
                    status={data?.isFollowed ?? null}
                    projectId={data?.id ?? ''}
                />
            </Aside.Section>
        </>
    )
}
