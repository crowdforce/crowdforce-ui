export type ErrorDto = {
  error: string
}

export type NewProjectDto = {
  id: string
}

export type ProjectDto = {
  id: string
  title: string
  description: string
  imageUrl: string | null
}

export type PublicProjectDto = {
  id: string
  title: string
  description: string
  imageUrl: string | null
  lng: number
  lat: number
}

export type AdminProjectDto = {
  id: string
  title: string
  description: string
  status: string
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
