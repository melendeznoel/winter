import { FhirResource } from '~/types'

type FhirText = {
  status: string
  div: string
}

export type FhirIngredient = FhirResource & {
  text: FhirText
}
