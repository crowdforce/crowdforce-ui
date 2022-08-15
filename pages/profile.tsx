import { useSession } from 'next-auth/react';
import Page from '../components/Page';
import { UserButton } from '@/components/UserButton';
import { Avatar, Card, Center, createStyles, Group, Stack, Text, Title, Image, Button } from '@mantine/core';
import useSWR from 'swr';

const useStyles = createStyles((theme) => ({
    bigGroup: {
        alignItems: 'flex-start',
        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'stretch',
            '& div': {
                maxWidth: 'unset',
            }
        }
    },
    generalInfo: {
        flexGrow: 'initial',
        marginRight: 'auto',
        [theme.fn.smallerThan('sm')]: {
            marginRight: 'unset',
        }
    }
}))

const MainPage = () => {
    const session = useSession();
    const isAuthenticated = session.status === 'authenticated'
    const { classes: s, cx } = useStyles();

    // PLACEHOLDER API
    const { data, error } = useSWR([
        '/api/profile',
        {
            method: 'post',
            body: JSON.stringify({ id: null }),
            headers: {
                'Content-Type': 'application/json'
            },
        },
    ])

    return (
        <Page>
            {isAuthenticated ? (
                <Group
                    noWrap
                    grow
                    className={s.bigGroup}
                >
                    <Card
                        withBorder
                        p='lg'
                        className={s.generalInfo}
                    >
                        <Group position='center'>
                            <Stack>
                                <Avatar src={session.data?.user?.image!} size={256} radius={'50%' as any} />
                                <Title order={1}>
                                    {session.data?.user?.name!}
                                </Title>
                            </Stack>
                        </Group>
                    </Card>
                    <Card withBorder>
                        <Card.Section
                            withBorder
                            inheritPadding
                            py='inherit'
                        >
                            <Title order={2}>
                                Проекты за которыми вы следите
                            </Title>
                        </Card.Section>
                        <Stack
                            py='inherit'
                        >
                            {data && data.following.map((x, i) => (
                                <Card withBorder>
                                    <Card.Section>
                                        <Image
                                            src={x.image}
                                            height={200}
                                        />
                                    </Card.Section>
                                    <Stack>
                                        <Title order={3}>
                                            {x.name}
                                        </Title>
                                        <Text>
                                            {x.description}
                                        </Text>
                                    </Stack>
                                    <Card.Section
                                        inheritPadding
                                        p='xs'
                                        mt='xs'
                                    >
                                        <Button
                                            fullWidth
                                            component='a'
                                            href={x.href}
                                        >
                                            Посмотреть проект
                                        </Button>
                                    </Card.Section>
                                </Card>
                            ))}
                        </Stack>
                    </Card>
                    <Card withBorder>
                        <Card.Section
                            withBorder
                            inheritPadding
                            py='inherit'
                        >
                            <Title order={2}>
                                Проекты которые вы курируете
                            </Title>
                        </Card.Section>
                        <Stack
                            py='inherit'
                        >
                            {data && data.owned.map((x, i) => (
                                <Card withBorder>
                                    <Card.Section>
                                        <Image
                                            src={x.image}
                                            height={200}
                                        />
                                    </Card.Section>
                                    <Stack>
                                        <Title order={3}>
                                            {x.name}
                                        </Title>
                                        <Text>
                                            {x.description}
                                        </Text>
                                    </Stack>
                                    <Card.Section
                                        inheritPadding
                                        p='xs'
                                        mt='xs'
                                    >
                                        <Button
                                            fullWidth
                                            component='a'
                                            href={x.href}
                                        >
                                            Посмотреть проект
                                        </Button>
                                    </Card.Section>
                                </Card>
                            ))}
                        </Stack>
                    </Card>
                </Group>
            ) : (
                <Center>
                    <Stack align='center'>
                        <Text size='lg'>
                            Войдите чтобы увидеть свой профиль
                        </Text>
                        <UserButton />
                    </Stack>
                </Center>
            )}
        </Page>
    );
};

export default MainPage;
