import { createStyles, Group, Stack, Title, Button, Card, SimpleGrid, Tooltip } from "@mantine/core"
import { IconPencil, IconTrash, IconUsers } from "@tabler/icons"
import Image from "next/image"
import Link from "next/link"
import { useCallback } from "react"

const useStyles = createStyles((theme) => ({
    card: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.colorScheme == "light" ? "white" : undefined,
    },
    cardSection: {
        position: "relative",
        height: 220,
    },
    button: {
        [theme.fn.smallerThan("lg")]: {
            padding: "0 10px",
        },
    },
}))

export type ProjectCardProps = {
    title: string
    description: string
    href: string
    coverSrc: string | null
    followers?: number
}

export const AdminProjectCard: React.FC<ProjectCardProps> = ({ title, description, coverSrc, href, followers }) => {
    const { classes: s } = useStyles()

    const onDelete = useCallback(() => null, []) // placeholder

    return (
        <Card
            className={s.card}
            radius={"lg"}
            shadow={"lg"}
        >
            <Card.Section
                className={s.cardSection}
            >
                <div>
                    {!coverSrc ? null : (
                        <Image
                            src={coverSrc}
                            alt={title}
                            layout='fill'
                            objectFit='cover'
                        />
                    )}
                </div>
            </Card.Section>
            <Stack sx={theme => ({
                flex: "1 0 auto",
                paddingTop: theme.spacing.sm,
            })}>
                <Title order={4}>
                    {title}
                </Title>
                <SimpleGrid
                    cols={5}
                >

                    <Tooltip
                        label="Удалить"
                        position="top"
                        withArrow
                    >
                        <Button
                            color="red"
                            onClick={onDelete}
                        >
                            <IconTrash />
                        </Button>
                    </Tooltip>
                    <Tooltip
                        label="Редактировать"
                        position="top"
                        withArrow
                    >
                        <Button
                            variant="default"
                        >
                            <IconPencil />
                        </Button>
                    </Tooltip>
                </SimpleGrid>
                <Group
                    grow
                    position='apart'
                    noWrap
                    mt='auto'
                >
                    <Link href={href} passHref>
                        <Button
                            component='a'
                            className={s.button}
                            fullWidth
                            style={{
                                maxWidth: "unset",
                            }}
                            radius={"md"}
                        >
                            Посмотреть детали
                        </Button>
                    </Link>

                    {!followers ? null : (
                        <Group
                            noWrap
                            grow
                            spacing='xs'
                        >
                            <IconUsers />
                            <div>
                                {followers}
                            </div>
                        </Group>
                    )}
                </Group>
            </Stack>
        </Card>
    )
}
