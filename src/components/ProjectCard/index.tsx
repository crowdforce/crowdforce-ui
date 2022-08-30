import { PublicProjectDto } from '@/common/types'
import { createStyles, Group, Text, Stack, Title, Button, Card } from '@mantine/core'
import { IconUsers } from '@tabler/icons'
import Image from 'next/image'
import Link from 'next/link'

const useStyles = createStyles((theme) => ({
    card: {
        boxShadow: '0px 10px 3px 0px #0000000D, 0px 10px 28px -7px #0000000D, 0px 17px 17px -7px #0000000A',
    },
    cardSection: {
        position: 'relative',
        height: 180,
    },
    button: {
        [theme.fn.smallerThan('lg')]: {
            padding: '0 10px',
        }
    }
}))

export const ProjectCard: React.FC<{ data: PublicProjectDto }> = ({ data }) => {
    const { classes: s, cx } = useStyles()

    return (
        <Card
            key={data.id}
            className={s.card}
        >
            <Card.Section
                className={s.cardSection}
            >
                <div>
                    {data.imageUrl && (
                        <Image
                            src={data.imageUrl}
                            layout='fill'
                            objectFit='cover'
                        />
                    )}
                </div>
            </Card.Section>
            <Stack>
                <Title order={4}>
                    {data.title}
                </Title>
                <Text>
                    {data.description}
                </Text>
                <Group
                    grow
                    position='apart'
                    noWrap
                >
                    <Link href={`/project/${data.id}`} passHref>
                        <Button
                            component='a'
                            className={s.button}
                            fullWidth
                            style={{
                                maxWidth: ' unset',
                            }}
                        >
                            Посмотреть детали
                        </Button>
                    </Link>

                    <Group
                        noWrap
                        grow
                        spacing='xs'
                    >
                        <IconUsers />
                        <div>
                            69
                        </div>
                    </Group>
                </Group>
            </Stack>
        </Card>
    )
}
