import { List, Stack } from "@mantine/core"
import useSWR from "swr"
import { EditFeatureDto } from "@/common/types"
import { GeometryIcon } from "./GeometryIcon"

export type ProjectSchemaLegendProps = {
    projectId: string
}

export const ProjectSchemaLegend: React.FC<ProjectSchemaLegendProps> = ({ projectId }) => {
    const { data } = useSWR<EditFeatureDto[]>(`/api/edit/projects/${projectId}/features`)

    return (
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
    )
}
