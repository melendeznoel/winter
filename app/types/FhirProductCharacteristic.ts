import { CodeableConcept } from './FhirCodeableConcept'
import { Quantity } from './FhirQuantity'

export type ProductCharacteristic = {
  type: CodeableConcept
  valueQuantity?: Quantity
  valueString?: string
}
