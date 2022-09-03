import { Button, Center, Container, createStyles, Group, keyframes, Loader, MediaQuery, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { IconCornerLeftDownDouble, IconMouse } from '@tabler/icons'
import Image from 'next/image'
import Page from '@/components/Page'
import heroLine from '@/../public/index/heroLine.svg'
import bigLine from '@/../public/index/bigLine.svg'
import blueLine from '@/../public/index/blueLine.svg'
import phone from '@/../public/index/phone.png'
import list from '@/../public/index/list.png'
import planet from '@/../public/index/planet.png'
import target from '@/../public/index/target.png'
import { GetStaticProps, NextPage } from 'next'
import { getProjects } from './api/projects'
import { ProjectCard } from '@/components/ProjectCard'
import React from 'react'
import { PublicProjectDto } from '@/common/types'
import useSWR, { SWRConfig } from 'swr'

type Props = {
    fallback: Record<string, any>
}

export const mouseAnimation = keyframes({
    '0%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(10px)' },
    '100%': { transform: 'translateY(0)' },
})

const useStyles = createStyles((theme) => ({
    container: {
        position: 'relative',
        maxWidth: 1160,
        overflow: 'visible',
        [theme.fn.smallerThan('sm')]: {
            paddingLeft: 'unset',
            paddingRight: 'unset',
        }
    },
    containerHero: {
        [theme.fn.smallerThan('xs')]: {
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: theme.spacing.xl,
        }
    },
    stackHero: {
        minHeight: 'min(min(100vh, 100vw) - 60px * 2 - 10vh, 925px)',
        position: 'relative',
        gap: '4rem',
        overflow: 'visible',
        [theme.fn.smallerThan('sm')]: {
            gap: '2rem',
        },
        [theme.fn.smallerThan('xs')]: {
            textAlign: 'center',
            justifyContent: 'space-evenly',
            minHeight: 'unset',
            paddingTop: '2rem',
        }

    },
    imageHero: {
        position: 'absolute',
        width: '100% ',
        height: 0,
        paddingTop: `${727 / 1047 * 100}%`,
        right: '-25%',
        [theme.fn.smallerThan('xs')]: {
            position: 'relative',
            right: 'unset',
            transform: 'scale(1.4)',
        }
    },
    buttonHero: {
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        [theme.fn.smallerThan('xs')]: {
            width: '100%',
            position: 'relative',
        }
    },
    subtitleHero: {
        fontSize: 30,
        zIndex: 1,
        [theme.fn.smallerThan('sm')]: {
            fontSize: 24,
        }
    },
    buttonShadow: {
        position: 'absolute',
        bottom: -10,
        opacity: .5,
        filter: 'blur(28px)',
        width: 250,
        height: 60,
        background: theme.colors.lime[6],
        borderRadius: theme.radius.lg,
        [theme.fn.smallerThan('xs')]: {
            width: ' 100%',
        },
    },
    lineHero: {
        position: 'absolute',
        bottom: 0,
        transform: 'translate(-40%, 25%)',
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        }
    },
    bigLineStack: {
        position: 'absolute',
        zIndex: 1,
        top: 250,
        width: 'min(100%, calc(642px * 1.25))',
        height: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        gap: '145px !important',
        [theme.fn.smallerThan('xs')]: {
            position: 'relative',
            top: 0,
            width: '100%',
            gap: 'unset !important',
            backgroundImage: 'url(/index/bigLaneMobile.svg)',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
        }
    },
    bigLineGroup: {
        flexWrap: 'nowrap',
        '& > *': {
            flex: '1 0 auto',
        },
        '& > span': {
            [theme.fn.smallerThan('xs')]: {
                flexBasis: 160,
            },
        },
        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column-reverse',
            '& > div': {
                width: '100%',
            }
        }
    },
    bigLineOdd: {
        flexDirection: 'row-reverse',
    },
    blueLine: {
        position: 'absolute',
        bottom: '12%',
        right: 0,
        transform: 'translate(40%)',
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },
    iconMouse: {
        animation: `${mouseAnimation} 3s ease-out infinite`,
    },
}))

const bigLineData = [
    {
        src: phone,
        title: (<>
            Присоединяйтесь <br />
            к Crowdforce
        </>),
        text: (<>
            Зарегистрируйтесь на сайте через <br />
            ваш акканут в Телеграм
        </>)
    },
    {
        src: list,
        title: (<>
            Наведите порядок <br />
            в садовых работах
        </>),
        subtitle: (<>
            вы куратор
        </>),
        text: (<>
            Создайте свой проект и запланируйте задачи  <br />
            по садовому уходу
        </>)
    },
    {
        src: planet,
        title: (<>
            Помогайте городам <br />
            процветать
        </>),
        subtitle: (<>
            вы помощник
        </>),
        text: (<>
            Выберите проект, которому вы хотите помочь <br />
            процветать и подпишитесь на его
        </>)
    },
    {
        src: target,
        title: (<>
            Помогаем <br />
            самоорганизоваться
        </>),
        text: (<>
            Телеграмм бот оповестит вас и ваших <br />
            помощников о задачах в саду, которые можно <br />
            взять на себя и к которым можно присоединиться.
        </>)
    },
]

const MainPageContainer: React.FC = () => {
    const { data: projects, error } = useSWR<PublicProjectDto[]>(`/api/projects`)
    const { classes: s, cx } = useStyles()

    return (
        <Page>
            <Container
                className={cx(s.container, s.containerHero)}
            >
                <div
                    className={s.imageHero}
                >
                    <Image
                        src={'/index/hero.png'}
                        layout='fill'
                        quality={100}
                    />
                </div>
                <Stack
                    justify='center'
                    className={s.stackHero}
                >
                    <Title
                        order={1}
                        sx={{
                            textTransform: 'uppercase',
                        }}
                    >
                        Помогаем <br />
                        навести порядок <br />
                        в расписании <br />
                    </Title>
                    <Text
                        className={s.subtitleHero}
                    >
                        садовых работ и найти помощников для <br />
                        ухода за садами и огородами
                    </Text>

                    <div
                        className={s.lineHero}
                    >
                        <Image
                            src={heroLine}
                            quality={100}
                        />
                    </div>
                    <div
                        className={s.buttonShadow}
                    />
                    <Button
                        uppercase
                        size='xl'
                        leftIcon={<IconCornerLeftDownDouble />}
                        component='a'
                        href='#projects'
                        className={s.buttonHero}
                        radius={'lg'}
                    >
                        Галерея проектов
                    </Button>
                </Stack>
            </Container>

            <MediaQuery smallerThan='xs' styles={{ display: 'none' }}>
                <Center
                    sx={{
                        paddingTop: '4rem',
                        transform: 'scale(1.5)',
                        color: 'rgba(39, 39, 46, 0.6)',
                    }}
                >
                    <IconMouse
                        className={s.iconMouse}
                    />
                </Center>
            </MediaQuery>

            <Container
                className={s.container}
                sx={{
                    paddingTop: '8rem',
                }}
            >
                <Title order={2}>
                    <Text inherit align='center'>
                        <MediaQuery smallerThan='xs' styles={{ display: 'none' }}>
                            <span>
                                Начни системный уход за своим садом <br />
                                или присоединяйся к проектам сообществ!
                            </span>
                        </MediaQuery>
                        <MediaQuery largerThan='xs' styles={{ display: 'none' }}>
                            <span>
                                Преимущества
                            </span>
                        </MediaQuery>
                    </Text>
                </Title>
            </Container>
            <Container
                className={s.container}
                sx={{
                    marginTop: '2rem',
                    overflow: 'hidden',
                }}
            >
                <Center>
                    <MediaQuery smallerThan='xs' styles={{ display: 'none' }}>
                        <div>
                            <Image
                                src={bigLine}
                                quality={100}
                            />
                        </div>
                    </MediaQuery>
                </Center>
                <Stack
                    className={s.bigLineStack}
                >
                    {bigLineData.map((x, i) => (
                        <Group
                            key={i}
                            position='apart'
                            className={cx(s.bigLineGroup, i % 2 == 1 && s.bigLineOdd)}
                        >
                            <Stack
                                sx={{
                                    gap: '1rem',
                                }}
                            >
                                {x.subtitle && (
                                    <MediaQuery smallerThan='xs' styles={{ display: 'none' }}>
                                        <Title order={5}>
                                            {x.subtitle}
                                        </Title>
                                    </MediaQuery>
                                )}
                                <Title order={3}>
                                    {x.title}
                                </Title>
                                <Text
                                    size='xl'
                                >
                                    {x.text}
                                </Text>
                            </Stack>
                            <Image
                                src={x.src}
                                quality={100}
                                objectFit='contain'
                            />
                        </Group>
                    ))}
                </Stack>
                <div
                    className={s.blueLine}
                >
                    <Image
                        src={blueLine}
                        quality={100}
                    />
                </div>
            </Container>
            <Container
                className={s.container}
                sx={{
                    paddingTop: '8rem',
                }}
            >
                <Title order={2}>
                    <Text inherit align='center'>
                        Галерея проектов
                    </Text>
                </Title>
            </Container>

            <span id='projects' />
            <Container
                className={s.container}
                sx={{
                    paddingTop: '8rem',
                }}
            >
                {(!projects) ? (
                    <Center
                        sx={{
                            height: '100%',
                        }}
                    >
                        <Loader />
                    </Center>
                ) : (
                    <SimpleGrid
                        cols={3}
                        breakpoints={[
                            { maxWidth: 'xl', cols: 3, },
                            { maxWidth: 'md', cols: 2, },
                            { maxWidth: 'xs', cols: 1, },
                        ]}
                    >
                        {projects.map((x, i) => (
                            <ProjectCard
                                key={x.id}
                                title={x.title}
                                description={x.description}
                                href={`/project/${x.id}`}
                                coverSrc={x.imageUrl}
                                followers={69}
                            />
                        ))}
                    </SimpleGrid>
                )}
            </Container>
            <div style={{
                height: '8rem'
            }} />
        </Page >
    )
}

const MainPage: NextPage<Props> = ({ fallback }) => (
    <SWRConfig value={{ fallback }}>
        <MainPageContainer />
    </SWRConfig>
)

export const getStaticProps: GetStaticProps = async ctx => {
    const projects = await getProjects()
    return {
        props: {
            fallback: {
                '/api/projects': projects
            }
        }
    }
}

export default MainPage
