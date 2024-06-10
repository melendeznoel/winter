type FhirText = {
  status: string
  div: string
}

type Meta = {
  versionId: string
  lastUpdated: string
}

export type FhirResource = {
  resourceType: string
  id: string
  text: FhirText
  meta: Meta
}
