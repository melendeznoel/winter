import React from 'react'
import { type LinksFunction, json } from '@remix-run/node'
import { Form, Links, Meta, Scripts, ScrollRestoration, Outlet, Link, useLoaderData } from '@remix-run/react'
import { FhirService } from './services'
import { Configuration } from '~/Configuration'
import { FhirNutritionProduct } from '~/types'
import appStylesHref from './app.css?url'

let contacts: FhirNutritionProduct[] = []

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref }
]

export const loader = async () => {
  const config: Configuration = {
    api: {
      wholegrain: {
        url: process.env.REACT_APP_WHOLEGRAIN_API_URL
      }
    }
  }

  const fhirService = new FhirService(config)

  contacts = await fhirService.findNutritionProduct()

  return json({ contacts })
}

export const action = async () =>{
  const nutritionProduct: Partial<FhirNutritionProduct> = {
    resourceType: 'NutritionProduct'
  }

  contacts.push(nutritionProduct as FhirNutritionProduct)

  return json({ nutritionProduct })
}

export default function App () {
  const { contacts } = useLoaderData<typeof loader>()

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <Meta/>
      <Links/>
    </head>
    <body>
    <div id="sidebar">
      <h1>Remix Contacts</h1>
      <div>
        <Form id="search-form" role="search">
          <input
            aria-label="Search contacts"
            id="q"
            name="q"
            placeholder="Search"
            type="search"
          />
          <div
            aria-hidden
            hidden={ true }
            id="search-spinner"
          />
        </Form>
        <Form method="post">
          <button type="submit">New</button>
        </Form>
      </div>
      <nav>
        { contacts.length ? (
          <ul>
            { contacts.map((contact) => (
              <li key={ contact.id }>
                <Link to={ `nutritionproduct/${ contact.id }` }>
                  { contact.resourceType ? (
                    <>
                      { contact.resourceType }
                    </>
                  ) : (
                    <i>No Name</i>
                  ) }{ ' ' }
                  { contact.status ? (
                    <span>★</span>
                  ) : null }
                </Link>
              </li>
            )) }
          </ul>
        ) : (
          <p>
            <i>No contacts</i>
          </p>
        ) }
      </nav>
    </div>

    <div id="detail">
      <Outlet/>
    </div>

    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>
  )
}
