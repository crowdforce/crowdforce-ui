import s from "./marker.module.css"

import { memo } from "react"

export type ImageMarkerProps = {
    src: string
    size: number
    style?: React.CSSProperties
}

export const ImageMarker: React.FC<ImageMarkerProps> = memo(props => (
    <span
        className={`${s.icon} ${s.circle}`}
        style={{
            ...props.style,
            width: props.size,
            height: props.size,
            backgroundImage: `url(${props.src})`,
        }}
    />
))

ImageMarker.displayName = "ImageMarker"
