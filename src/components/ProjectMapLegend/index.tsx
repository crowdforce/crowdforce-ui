import { List, Stack } from "@mantine/core"
import useSWR from "swr"
import { AdminFeatureDto } from "@/common/types"
import { GeometryIcon } from "./GeometryIcon"

export type ProjectMapLegendProps = {
    projectId: string
}

export const ProjectMapLegend: React.FC<ProjectMapLegendProps> = ({ projectId }) => {
    const { data } = useSWR<AdminFeatureDto[]>(`/api/admin/projects/${projectId}/features`)

    return (
        <Stack>
            <List>
                {(data ?? []).map(item => (
                    <List.Item
                        key={item.id}
                        icon={(
                            <GeometryIcon type={item.geometryType} />
                        )}
                    >
                        {item.title}
                    </List.Item>
                ))}
            </List>
        </Stack>
    )
}
