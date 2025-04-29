// @ts-check

const core = require('@actions/core')
const { CommerceLayer } = require('@commercelayer/sdk')
const { authenticate } = require('@commercelayer/js-auth')

;(async () => {
  const auth = await authenticate('client_credentials', {
    clientId: core.getInput('clientId'),
    clientSecret: core.getInput('clientSecret'),
    domain: core.getInput('domain'),
  })

  const client = CommerceLayer({
    accessToken: auth.accessToken
  })

  const [customer] = await client.customers.list({
    filters: {
      email_eq: 'drop-in.js@commercelayer.io'
    },
    fields: {
      customers: ['id']
    }
  })

  if (!customer) {
    console.error('Customer not found.')
    process.exit(1)
  }

  const addresses = await client.customers.customer_addresses(customer.id)

  addresses.forEach(async address => {
    await client.customer_addresses.delete(address.id)
  })

})()
