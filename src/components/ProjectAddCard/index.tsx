import { NewProjectDto } from "@/common/types"
import { createStyles, Text, Stack, Card } from "@mantine/core"
import { IconPlus } from "@tabler/icons"
import { useRouter } from "next/router"
import { useCallback } from "react"

const useStyles = createStyles((theme) => ({
    card: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.colorScheme == "light" ? "white" : undefined,
        cursor: "pointer",
    },
    cardSection: {
        position: "relative",
        height: 220,
    },
    circle: {
        position: "relative",
        height: 0,
        width: "33%",
        paddingTop: "33%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        backgroundColor: theme.colors.lime[6],
        ["*:hover > &"]: {
            backgroundColor: theme.colors.lime[8],
        },
        ["& > div"]: {
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
        },
    },
}))

export type ProjectAddCardProps = {

}

export const ProjectAddCard: React.FC<ProjectAddCardProps> = () => {
    const { classes: s } = useStyles()

    const router = useRouter()
    const onNewProject = useCallback(() => {
        fetch(
            "/api/admin/projects/create",
            {
                method: "POST",
            },
        )
            .then(async res => {
                if (res.ok && res.status == 200) {
                    return res.json()
                } else {
                    throw Error(res.statusText)
                }
            })
            .then((res: NewProjectDto) => {
                router.push(`/project/${res.id}/edit`)
            })
            .catch(e => {
                // eslint-disable-next-line no-console
                console.log("API error: ", e)
            })
    }, [router])

    return (
        <Card
            className={s.card}
            radius={"lg"}
            shadow={"lg"}
            onClick={onNewProject}
        >
            <Stack
                sx={{
                    height: "100%",
                }}
                align="center"
                justify="center"
            >
                <Text
                    align="center"
                    weight="bold"
                    sx={{
                        whiteSpace: "pre-line",
                    }}
                >
                    {"Добавить\nновый проект"}
                </Text>
                <div className={s.circle}>
                    <div>
                        <Stack
                            align="center"
                            justify="center"
                            sx={{
                                height: "100%",
                            }}
                        >
                            <IconPlus
                                size={42}
                                color="white"
                            />
                        </Stack>
                    </div>
                </div>
            </Stack>
        </Card>
    )
}
