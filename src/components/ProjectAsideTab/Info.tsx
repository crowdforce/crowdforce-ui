import { Aside, createStyles, Group, ScrollArea, Text, Image, AspectRatio, Stack, Loader } from "@mantine/core"
import { IconMapPin } from "@tabler/icons"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { ProjectData } from "pages/project/[projectId]"
import React from "react"
import useSWR from "swr"
import { FollowProjectButton } from "../FollowProjectButton"

type ProjectInfoProps = {

}

const useStyles = createStyles((theme) => ({
    icon: {
        flex: "0 0 auto",
        color: theme.colors.gray[6], // dimmed color
    },
    ownerAndLink: {
        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start",
        },
    },
}))

export const Info: React.FC<ProjectInfoProps> = () => {
    const { classes: s, cx } = useStyles()
    const router = useRouter()
    const { data, error } = useSWR<ProjectData>(`/api/projects/${router.query.projectId}`)
    const session = useSession()
    const isUnauthenticated = session.status == "unauthenticated"

    if (!data) {
        return (<Loader />)
    }

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
                            src={data?.imageUrl ?? "/wip.png"}
                            radius='lg'
                            alt="project image"
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

            {isUnauthenticated ? null : (
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
                        projectId={data?.id ?? ""}
                    />
                </Aside.Section>
            )}
        </>
    )
}
