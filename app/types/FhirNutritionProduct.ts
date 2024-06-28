import { FhirResource } from '~/types/FhirResource'
import { CodeableConcept } from '~/types/FhirCodeableConcept'
import { Reference } from '~/types/FhirRerence'
import { Nutrient } from '~/types/FhirNutrient'
import { Ingredient } from '~/types/FhirIngredient'
import { ProductCharacteristic } from '~/types/FhirProductCharacteristic'
import { Instance } from '~/types/FhirInstance'

export type FhirNutritionProduct = FhirResource & {
  code: CodeableConcept
  status: string
  category: CodeableConcept[]
  manufacturer: Reference[]
  nutrient: Nutrient[]
  ingredient: Ingredient[]
  knownAllergen: CodeableConcept[]
  productCharacteristic: ProductCharacteristic[]
  instance: Instance[]
}
