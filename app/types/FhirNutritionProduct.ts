import { FhirResource } from '~/types'

export type FhirNutritionProduct = FhirResource & {
  status: string
}
