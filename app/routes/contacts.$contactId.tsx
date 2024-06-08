import React from 'react'
import { Form, useLoaderData } from '@remix-run/react'
import type { FunctionComponent } from 'react'
import { json } from '@remix-run/node'
import { type ContactRecord, FhirService } from '../services'
import { Configuration } from '~/Configuration'
import avocadoAvatar from '../avocado.jpg'

export const loader = async ({ params }) => {
  const config: Configuration = {
    api: {
      wholegrain: {
        // todo: add env mapping for the url
        url: ''
      }
    }
  }

  const fhirService = new FhirService(config)

  const nutritionProduct = await fhirService.getNutritionProduct(params.contactId)

  return json({nutritionProduct})
}

export default function Contact () {
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
          {/*<Favorite contact={ nutritionProduct }/>*/}
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

        {/*{ nutritionProduct.notes ? <p>{ nutritionProduct.notes }</p> : null }*/}

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

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, 'favorite'>;
}> = ({ contact }) => {
  const favorite = contact.favorite

  return (
    <Form method="post">
      <button
        aria-label={
          favorite
            ? 'Remove from favorites'
            : 'Add to favorites'
        }
        name="favorite"
        value={ favorite ? 'false' : 'true' }
      >
        { favorite ? '★' : '☆' }
      </button>
    </Form>
  )
}
