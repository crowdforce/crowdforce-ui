import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { createStyles, Group, Text, Stack, Button, Accordion, Avatar, Center, Space, Loader } from '@mantine/core'
import { useRouter } from 'next/router'
import { ProjectTask } from 'pages/api/projects/[projectId]/tasks'
import { useContext } from 'react'
import useSWR from 'swr'

const useStyles = createStyles((theme) => ({
    control: {
        '& > div:nth-child(1)': { // select chevron
            marginRight: 0,
        },
    },
    oddColor: {
        background: '#F4FAFD',
    },
    item: {
        '&:hover': {
            background: theme.colors.lime[1],
        },
        '&[data-active]': {
            background: theme.colors.lime[1],
        }
    },
    groupHead: {
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },
    completed: {
        opacity: .5,
    }
}))

export type ProjectTasksListProps = {
    variant?: 'default' | 'completed'
}

export const ProjectTasksList: React.FC<ProjectTasksListProps> = ({ variant = 'default' }) => {
    const { classes: s, cx } = useStyles()
    const { isAdmin } = useContext(ProjectSideMenuContext)
    const isDefault = variant === 'default'
    const isCompleted = variant === 'completed'
    const router = useRouter()
    const { data, error } = useSWR<ProjectTask[]>(`/api/projects/${router.query.projectId}/tasks`)

    if (!data) {
        return <Loader />
    }

    return (
        <Accordion
            chevron={null}
            chevronSize={0}
            variant='filled'
            disableChevronRotation
            chevronPosition='left'
            radius='md'
            styles={{
                content: {
                    padding: 8,
                    paddingTop: 5,
                }
            }}
        >
            {data.map((x, i) => (
                <Accordion.Item
                    key={x.id}
                    value={x.id}
                    className={cx(i % 2 === 0 && s.oddColor, s.item, isCompleted && s.completed)}
                >
                    <Accordion.Control
                        className={s.control}
                    >
                        <Group
                            noWrap
                            position='apart'
                            align='flex-start'
                            className={s.groupHead}
                        >
                            <Text>
                                {x.title}
                            </Text>
                            <Group
                                noWrap
                                spacing={'xs'}
                            >
                                <Stack
                                    spacing={0}
                                >
                                    <Text
                                        weight={700}
                                    >
                                        {x.dateStart}
                                    </Text>

                                    {x.dateStart !== x.dateEnd && (
                                        <Text
                                            weight={700}
                                        >
                                            {x.dateEnd}
                                        </Text>
                                    )}
                                </Stack>
                                <Stack
                                    spacing={0}
                                >
                                    <Text>
                                        {x.timeStart}
                                    </Text>
                                    <Text>
                                        {x.timeEnd}
                                    </Text>
                                </Stack>
                            </Group>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Stack
                            spacing='xs'
                        >
                            <Text>
                                {x.description}
                            </Text>

                            <Space />
                            {isDefault && (
                                <>
                                    <Center>
                                        <Button
                                            uppercase
                                            sx={{
                                                width: 'fit-content',
                                            }}
                                        >
                                            Вписаться в движ
                                        </Button>
                                    </Center>

                                    <Space />
                                </>
                            )}
                            {x.followers
                                .sort((a, b) => {
                                    if (a.status == 'leader') return -1
                                    if (b.status == 'leader') return 1
                                    return 0
                                })
                                .map((y, iy) => (
                                    <Group
                                        key={y.name}
                                        noWrap
                                        position='apart'
                                    >
                                        <Group
                                            noWrap
                                            sx={{
                                                flex: '1 1 auto',
                                            }}
                                        >
                                            <Avatar
                                                size='sm'
                                                src={y.image}
                                            />
                                            <Text
                                                sx={{
                                                    flex: '1 1 auto',
                                                }}
                                            >
                                                {y.name}
                                            </Text>
                                        </Group>
                                        {y.status == 'leader' ? (
                                            <Center>
                                                <Text
                                                    weight={700}
                                                    transform='uppercase'
                                                    sx={{
                                                        fontSize: 13,
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    ответственый
                                                </Text>
                                            </Center>
                                        ) : isDefault && isAdmin && (
                                            <Button
                                                size='xs'
                                                compact
                                                px='xs'
                                                py={4}
                                                styles={{
                                                    root: {
                                                        height: ' auto',
                                                        fontSize: 10,
                                                    },
                                                    label: {
                                                        textAlign: 'center',
                                                    }
                                                }}
                                            >
                                                назначить<br />ответственым
                                            </Button>
                                        )}
                                    </Group>
                                ))}
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
