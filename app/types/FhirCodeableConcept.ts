import { Coding } from './FhirCoding'

export type CodeableConcept = {
  coding: Coding[]
  text: string
}
