import { createStyles, ScrollArea, Table } from "@mantine/core"
import { Task } from "@prisma/client"

const useStyles = createStyles((theme) => ({
    card: {
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
    },
    cardSection: {
        position: "relative",
        height: 220,
    },
}))

export type ProfileTasksProps = {
    data: Partial<Task>[]
}

export const ProfileTasks: React.FC<ProfileTasksProps> = ({ data }) => {
    const { classes: s } = useStyles()

    return (
        <ScrollArea>
            <Table>
                <tbody>
                    {data.map((x) => (
                        <tr key={x.id}>
                            <td>
                                one
                            </td>
                            <td>
                                two
                            </td>
                            <td>
                                tree
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </ScrollArea>
    )
}
