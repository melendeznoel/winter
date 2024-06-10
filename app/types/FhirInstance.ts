import { Quantity } from './FhirQuantity'
import { Identifier } from './FhirIdentifier'

export type Instance = {
  quantity: Quantity
  identifier: Identifier[]
  expiry: string
  lotNumber: string
}
