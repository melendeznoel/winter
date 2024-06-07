import { logIt } from '../tools'
import { type Configuration } from '~/Configuration'
import { get, isNil } from 'lodash'
import { FhirNutritionProduct } from '../types'


export class FhirService {
  constructor (private readonly config: Configuration) {
  }

  public async findNutritionProduct (): Promise<FhirNutritionProduct[]> {
    logIt('Finding Nutrition Product')

    const apiUrl = get(this.config, 'api.wholegrain.url') ?? ''

    const NutritionProduct = await fetch(`${ apiUrl }/nutritionproduct/_search`, { method: 'POST' })
      .then((response) => response.json())
      .catch(reason => {
        logIt('Fetching ingredients from API throw an error')
        throw reason
      })

    logIt('Search Results for Nutrition Product')

    return isNil(NutritionProduct) ? [] : [NutritionProduct]
  }
}
