import React from 'react'
import { Form, useLoaderData } from '@remix-run/react'
// import type { FunctionComponent } from 'react'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { FhirService } from '../services'
import { Configuration } from '../Configuration'
import avocadoAvatar from '../avocado.jpg'
import { get, isNil } from 'lodash'
import invariant from 'tiny-invariant'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const config: Configuration = {
    api: {
      wholegrain: {
        url: process.env.REACT_APP_WHOLEGRAIN_API_URL
      }
    }
  }

  const fhirService = new FhirService(config)

  const nutritionProductId = get(params, 'id')

  invariant(nutritionProductId, 'missing id param')

  const nutritionProduct = await fhirService.getNutritionProduct(nutritionProductId)

  if (isNil(nutritionProduct)) throw new Response('Not Found', { status: 404 })

  return json({ nutritionProduct })
}

export default function NutritionProduct () {
  const { nutritionProduct } = useLoaderData<typeof loader>()

  return (
    <div id="contact">
      <div>
        <img
          alt={ `${ nutritionProduct?.resourceType } avatar` }
          key={ nutritionProduct?.id }
          src={ avocadoAvatar }
        />
      </div>

      <div>
        <h1>
          { nutritionProduct?.resourceType ? (
            <>
              { nutritionProduct.resourceType }
            </>
          ) : (
            <i>No Name</i>
          ) }{ ' ' }
          {/*{<Favorite contact={ nutritionProduct }/> }*/}
        </h1>

        { nutritionProduct?.resourceType ? (
          <p>
            <a
              href={ `https://www.hl7.org/fhir/${ nutritionProduct?.resourceType }.html` }
            >
              { nutritionProduct.resourceType }
            </a>
          </p>
        ) : null }

        {/*{ nutritionProduct.notes ? <p>{ nutritionProduct.notes }</p> : null }*/ }

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={ (event) => {
              const response = confirm(
                'Please confirm you want to delete this record.'
              )
              if (!response) {
                event.preventDefault()
              }
            } }
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

// todo: update mapping
// const Favorite: FunctionComponent<{ contact: Pick<Record<string, unknown>, 'favorite'>; }> = ({ contact }) => {
//   const favorite = contact.favorite
//
//   return (
//     <Form method="post">
//       <button
//         aria-label={
//           favorite
//             ? 'Remove from favorites'
//             : 'Add to favorites'
//         }
//         name="favorite"
//         value={ favorite ? 'false' : 'true' }
//       >
//         { favorite ? '★' : '☆' }
//       </button>
//     </Form>
//   )
// }
