import { Dispatch, SetStateAction } from "react"
import { Button } from "@mantine/core"

export type MapStyleSelectorProps = {
  mapStyle: string
  setMapStyle: Dispatch<SetStateAction<string>>
  mapStyles: Record<"satellite" | "vector", {
    style: string
    title: string
  }>
}

export const MapStyleSelector: React.FC<MapStyleSelectorProps> = ({ mapStyle, setMapStyle, mapStyles }) => (
  <Button.Group
    sx={{
      position: "absolute",
      zIndex: 2,
      bottom: 16,
      right: 16,
    }}
  >
    {Object.values(mapStyles).map((x, _) => (
      <Button
        key={x.style}
        size='xs'
        color='gray'
        variant='filled'
        onClick={() => setMapStyle(x.style)}
        sx={theme => ({
          background: "white",
          color: mapStyle === x.style ? theme.colors.lime : theme.colors.gray,
          ":hover": {
            background: "white",
          },
        })}
      >
        {x.title}
      </Button>
    ))}
  </Button.Group>
)

