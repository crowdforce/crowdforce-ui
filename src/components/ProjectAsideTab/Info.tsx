import { ProjectDto } from '@/common/types'
import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { Aside, createStyles, Group, ScrollArea, Title, Text, Image, Space, AspectRatio, Container, Box, Stack } from '@mantine/core'
import { IconMapPin, IconUsers } from '@tabler/icons'
import Link from 'next/link'
import React, { useContext, } from 'react'
import { FollowProjectButton } from '../FollowProjectButton'
import { buttons, ProjectSideMenuIds } from '../ProjectSideMenu'

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
                            <Text
                                color='dimmed'
                            >
                                Санкт-Петербург, наб. р. Карповки, 26/4
                            </Text>
                            <Group
                                noWrap
                                spacing='xs'
                                className={s.ownerAndLink}
                            >
                                <Text
                                    color='dimmed'
                                >
                                    Папочка Эльф
                                </Text>
                                <Link href={'www.redisYdorogi.ru'} passHref>
                                    <Text
                                        color='dimmed'
                                        component='a'
                                        underline
                                    >
                                        www.redisYdorogi.ru
                                    </Text>
                                </Link>
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
