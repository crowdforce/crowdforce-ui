import { createStyles, Group, Text, Stack, Title, Button, Card } from "@mantine/core"
import { IconUsers } from "@tabler/icons"
import Image from "next/legacy/image"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
    card: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.colorScheme == "light" ? "white" : undefined,
        // boxShadow: '0 4px 8px 2px rgba(10, 60, 30, 0.05), 0px 8px 16px -4px rgba(0, 0, 0, 0.1), 8px 24px 24px 0px rgba(0, 0, 0, 0)',
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

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, coverSrc, href, followers }) => {
    const { classes: s } = useStyles()

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
                <Text
                    lineClamp={8}
                >
                    {description}
                </Text>
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
