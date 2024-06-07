type FhirText = {
  status: string
  div: string
}

export type FhirResource = {
  resourceType: string
  id: string
  text: FhirText
}
