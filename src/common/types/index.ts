export type ErrorDto = {
  error: string
}

export type Geometry = GeoJSON.Point | GeoJSON.Polygon

export type NewProjectDto = {
  id: string
}

export type ProjectDto = {
  id: string
  title: string
  description: string
  imageUrl: string | null
  isFollowed: boolean | null
}

export type PublicProjectDto = {
  id: string
  title: string
  description: string
  imageUrl: string | null
  followers?: number
  lng: number
  lat: number
}

export type AdminProjectDto = {
  id: string
  title: string
  description: string
  status: string
  viewport: {
    lng: number
    lat: number
    zoom: number
  }
}

export type NewFeatureDto = {
  id: string
}

export type AdminFeatureDto = {
  id: string
  title: string
  description: string
  geometryType: string
  coordinates: object
}

export type FollowResponseDto = {
  status: boolean
}

export type MapViewportDto = {
  lng: number
  lat: number
  zoom: number
}
