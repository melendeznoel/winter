import { logIt } from '../tools'
import { type Configuration } from '~/Configuration'
import { get, isNil, find } from 'lodash'
import { FhirNutritionProduct } from '../types'


export class FhirService {
  constructor (private readonly config: Configuration) {
  }

  public async findNutritionProduct (): Promise<FhirNutritionProduct[]> {
    logIt('Finding Nutrition Product')

    const apiUrl = get(this.config, 'api.wholegrain.url') ?? ''

    const nutritionProducts = await fetch(`${ apiUrl }/nutritionproduct/_search`, { method: 'POST' })
      .then((response) => response.json())
      .catch(reason => {
        logIt('Fetching ingredients from API throw an error')
        throw reason
      })

    logIt('Search Results for Nutrition Product')

    return isNil(nutritionProducts) ? [] : nutritionProducts
  }

  public async getNutritionProduct (id: string): Promise<FhirNutritionProduct|undefined> {
    const nutritionProducts = await this.findNutritionProduct()

    const result = find(nutritionProducts, { id })

    return result
  }
}
