import { createStyles, Group, Text, Stack, Button, Accordion, Avatar, Center, Space } from '@mantine/core'

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

const tasksDataPlaceholder = [
    {
        id: 'one',
        title: 'Вскопать грядки для редиса длииинная надпись для переноса можно это сделать в 2 строки',
        description: 'Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: выбранный нами инновационный путь способствует подготовке и реализации приоретизации разума над эмоциями. А также сторонники тоталитаризма в науке ограничены исключительно образом мышления.',
        dateStart: '06.06.2022',
        timeStart: '10:00',
        dateEnd: '07.06.2022',
        timeEnd: '13:00',
        followers: [
            {
                name: 'Арагорн, сын Агронома',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Фродо Беггинс',
                image: '/ms-icon-150x150.png',
                status: 'leader',
            },
            {
                name: 'Шмыга',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Пендальф Серый',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
        ]
    },
    {
        id: 'two',
        title: 'Вскопать грядки для редиса длииинная надпись для переноса можно это сделать в 2 строки',
        description: 'Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: выбранный нами инновационный путь способствует подготовке и реализации приоретизации разума над эмоциями. А также сторонники тоталитаризма в науке ограничены исключительно образом мышления.',
        dateStart: '06.06.2022',
        timeStart: '11:00',
        dateEnd: '06.07.2022',
        timeEnd: '13:00',
        followers: [
            {
                name: 'Арагорн, сын Агронома',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Бильбо Беггинс',
                image: '/ms-icon-150x150.png',
                status: 'leader',
            },
            {
                name: 'Шмыга',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Сильмариллион Варфолломилович',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
        ]
    },
    {
        id: 'tree',
        title: 'Вскопать грядки для редиса длииинная надпись для переноса можно это сделать в 2 строки',
        description: 'Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: выбранный нами инновационный путь способствует подготовке и реализации приоретизации разума над эмоциями. А также сторонники тоталитаризма в науке ограничены исключительно образом мышления.',
        dateStart: '06.06.2022',
        timeStart: '10:00',
        dateEnd: '06.06.2022',
        timeEnd: '13:00',
        followers: [
            {
                name: 'Арагорн, сын Агронома',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Фродо Беггинс',
                image: '/ms-icon-150x150.png',
                status: 'leader',
            },
            {
                name: 'Шмыга',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Пендальф Серый',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
        ]
    },
    {
        id: 'four',
        title: 'Вскопать грядки для редиса длииинная надпись для переноса можно это сделать в 2 строки',
        description: 'Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: выбранный нами инновационный путь способствует подготовке и реализации приоретизации разума над эмоциями. А также сторонники тоталитаризма в науке ограничены исключительно образом мышления.',
        dateStart: '06.06.2022',
        timeStart: '10:00',
        dateEnd: '06.06.2022',
        timeEnd: '13:00',
        followers: [
            {
                name: 'Арагорн, сын Агронома',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Фродо Беггинс',
                image: '/ms-icon-150x150.png',
                status: 'leader',
            },
            {
                name: 'Шмыга',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
            {
                name: 'Пендальф Серый',
                image: '/ms-icon-150x150.png',
                status: 'follower',
            },
        ]
    },
]

export const ProjectTasksList: React.FC<ProjectTasksListProps> = ({ variant = 'default' }) => {
    const { classes: s, cx } = useStyles()
    const isDefault = variant === 'default'
    const isCompleted = variant === 'completed'
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
            {tasksDataPlaceholder.map((x, i) => (
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

                            {x.followers.map((y, iy) => (
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
                                    ) : isDefault && (
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
