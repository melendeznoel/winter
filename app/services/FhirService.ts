import { logIt } from '../tools'
import { type Configuration } from '~/Configuration'
import { get, isNil } from 'lodash'
import { FhirIngredient } from '../types'


export class FhirService {
  constructor (private readonly config: Configuration) {
  }

  public async findIngredient (): Promise<FhirIngredient[]> {
    logIt('mock')

    const apiUrl = get(this.config, 'api.wholegrain.url') ?? ''

    const ingredient = await fetch(`${ apiUrl }/ingredient/_search`, { method: 'POST' })
      .then((response) => response.json())
      .catch(reason => {
        logIt('Fetching ingredients from API throw an error')
        throw reason
      })

    return isNil(ingredient) ? [] : [ingredient]
  }
}
