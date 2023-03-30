import useSWR from "swr"
import { EditFeatureDto } from "@/common/types"
import { GeometryIcon } from "./GeometryIcon"
import { Accordion } from "@mantine/core"
import { FeatureItem } from "./FeatureItem"

export type ProjectSchemaLegendProps = {
    projectId: string
}

export const ProjectSchemaLegend: React.FC<ProjectSchemaLegendProps> = ({ projectId }) => {
    const { data } = useSWR<EditFeatureDto[]>(`/api/edit/projects/${projectId}/features`)

    return (
        <Accordion
            variant="contained"
        >
            {(data ?? []).map(item => (
                <Accordion.Item
                    key={item.id}
                    value={item.id}>
                    <Accordion.Control
                        icon={(
                            // <IconPhoto size={20} color={getColor("red")} />
                            <GeometryIcon type={item.geometryType} />
                        )}>
                        {item.title}
                    </Accordion.Control>
                    <Accordion.Panel>
                        <FeatureItem
                            featureId={item.id}
                            projectId={projectId}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
