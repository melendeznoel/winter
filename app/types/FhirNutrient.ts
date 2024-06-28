import { CodeableConcept } from './FhirCodeableConcept'
import { Quantity } from './FhirQuantity'

export type Nutrient = {
  item: CodeableConcept
  amount: Quantity
}
