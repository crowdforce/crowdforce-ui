import { IconPoint, IconPolygon, IconTree } from "@tabler/icons"

export type GeometryIconProps = {
    type: string
}

export const GeometryIcon: React.FC<GeometryIconProps> = ({ type }) => {
    if (type === "Point") {
        return (
            <IconTree />
        )
    }

    if (type === "Polygon") {
        return (
            <IconPolygon />
        )
    }

    return (
        <IconPoint />
    )
}
