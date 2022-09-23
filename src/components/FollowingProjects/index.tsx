import useSWR from "swr"
import { createStyles, SimpleGrid, Box, Alert, Center, Loader } from "@mantine/core"
import { ProjectCard } from "@/components/ProjectCard"
import { IconAlertCircle } from "@tabler/icons"
import { ProjectDto } from "@/common/types"

const useStyles = createStyles((theme) => ({
    section: {
        position: "relative",
        width: "100%",
        maxWidth: 1160,
    },
}))

type FollowingProjectsProps = {
}

export const FollowingProjects: React.FC<FollowingProjectsProps> = () => {
    const { classes: s } = useStyles()
    const { data } = useSWR<ProjectDto[]>("/api/profile/projects/follow")

    if (!data) {
        return (
            <Center>
                <Loader />
            </Center>
        )
    }

    if (data.length === 0) {
        return (
            <Box
                className={s.section}
            >
                <Alert
                    icon={(
                        <IconAlertCircle size={16} />
                    )}
                    variant="filled"
                    title="Проектов нет"
                    color="teal"
                    radius="md"
                    sx={{
                        maxWidth: 520,
                    }}
                >
                    Вы не подписаны ни на один проект. Найдите для себя что-то интересное на главной странице или карте
                </Alert>
            </Box>
        )
    }

    return (
        <SimpleGrid
            className={s.section}
            cols={3}
            breakpoints={[
                { maxWidth: "xl", cols: 3 },
                { maxWidth: "md", cols: 2 },
                { maxWidth: "xs", cols: 1 },
            ]}
        >
            {data.map(({ id, title, description, imageUrl }) => (
                <ProjectCard
                    key={id}
                    coverSrc={imageUrl}
                    title={title}
                    description={description}
                    href={`/project/${id}`}
                />
            ))}
        </SimpleGrid>
    )
}
