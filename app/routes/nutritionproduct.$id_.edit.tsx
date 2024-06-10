import React from 'react'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { FhirService } from '../services'
import { Configuration } from '~/Configuration'
import {logIt} from '../tools'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, 'Missing contactId param')

  const config: Configuration = {
    api: {
      wholegrain: {
        url: process.env.REACT_APP_WHOLEGRAIN_API_URL
      }
    }
  }

  const fhirService = new FhirService(config)

  const nutritionProduct = await fhirService.getNutritionProduct(params.id)

  if (!nutritionProduct) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ nutritionProduct })
}

export default function EditNutritionProduct () {
  const { nutritionProduct } = useLoaderData<typeof loader>()

  const handleChange = (event: unknown) => {
    logIt('Status Changed')
  }

  return (
    <Form key={ nutritionProduct.id } id="nutrition-product-form" method="post">
      <p>
        <span>Name</span>
        <input
          defaultValue={ nutritionProduct.text.status }
          aria-label="First name"
          name="first"
          type="text"
          placeholder="First"
        />
        {/*<input*/}
        {/*  aria-label="Last name"*/}
        {/*  defaultValue={ nutritionProduct.last }*/}
        {/*  name="last"*/}
        {/*  placeholder="Last"*/}
        {/*  type="text"*/}
        {/*/>*/}
      </p>
      {/*<label>*/}
      {/*  <span>Twitter</span>*/}
      {/*  <input*/}
      {/*    defaultValue={ nutritionProduct.twitter }*/}
      {/*    name="twitter"*/}
      {/*    placeholder="@jack"*/}
      {/*    type="text"*/}
      {/*  />*/}
      {/*</label>*/}
      {/*<label>*/}
      {/*  <span>Avatar URL</span>*/}
      {/*  <input*/}
      {/*    aria-label="Avatar URL"*/}
      {/*    defaultValue={ nutritionProduct.avatar }*/}
      {/*    name="avatar"*/}
      {/*    placeholder="https://example.com/avatar.jpg"*/}
      {/*    type="text"*/}
      {/*  />*/}
      {/*</label>*/}
      {/*<label>*/}
      {/*  <span>Notes</span>*/}
      {/*  <textarea*/}
      {/*    defaultValue={ nutritionProduct.notes }*/}
      {/*    name="notes"*/}
      {/*    rows={ 6 }*/}
      {/*  />*/}
      {/*</label>*/}

      <label>
        Status
        <select value={ nutritionProduct.status } onChange={ handleChange }>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="EnteredInError">Entered-In-Error</option>
        </select>
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  )
}
