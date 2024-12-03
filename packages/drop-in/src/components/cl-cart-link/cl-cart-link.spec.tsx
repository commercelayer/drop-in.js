import * as cart from '#apis/commercelayer/cart'
import * as client from '#apis/commercelayer/client'
import type { CommerceLayerClient, WithRest } from '@commercelayer/js-sdk'
import { newSpecPage } from '@stencil/core/testing'
import { waitFor } from 'jest.spec.helpers'
import { CLCartLink } from './cl-cart-link'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('cl-cart-link.spec', () => {
  it('renders the cart url without a cartId during the first load', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken,
      scope: 'market:code:usa'
    })

    jest.spyOn(client, 'createClient').mockResolvedValue({
      request: jest.fn().mockResolvedValue({
        type: 'orders',
        id: 'order-123',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    } as unknown as CommerceLayerClient & WithRest)

    const { root, waitForChanges } = await newSpecPage({
      components: [CLCartLink],
      html: '<cl-cart-link>Cart</cl-cart-link>'
    })

    await waitFor(waitForChanges, () => {
      const link = root?.querySelector('a')
      return (
        link?.getAttribute('href') ===
        `https://drop-in-js.commercelayer.app/cart/null?accessToken=${accessToken}`
      )
    })

    expect(root).toEqualHtml(`
      <cl-cart-link cl-hydrated target="_self">
        <a href="https://drop-in-js.commercelayer.app/cart/null?accessToken=${accessToken}" target="_self">
          Cart
        </a>
      </cl-cart-link>
    `)
  })

  it('renders the cart url with a defined cartUrl', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken,
      scope: 'market:code:usa'
    })
    jest.spyOn(client, 'createClient').mockResolvedValue({
      request: jest.fn().mockResolvedValue({
        type: 'orders',
        id: 'order-123',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    } as unknown as CommerceLayerClient & WithRest)
    jest.spyOn(cart, 'getCart').mockResolvedValue({
      type: 'orders',
      id: 'order-123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'approved',
      fulfillment_status: 'fulfilled',
      payment_status: 'paid'
    })

    const { root, waitForChanges } = await newSpecPage({
      components: [CLCartLink],
      html: '<cl-cart-link>Cart</cl-cart-link>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-cart-link cl-hydrated target="_self">
        <a href="https://drop-in-js.commercelayer.app/cart/order-123?accessToken=${accessToken}" target="_self">
          Cart
        </a>
      </cl-cart-link>
    `)
  })

  it('renders the cart url with a cartId after clicking on the link when url is invalid', async () => {
    jest.spyOn(client, 'getAccessToken').mockResolvedValue({
      type: 'guest',
      accessToken,
      scope: 'market:code:usa'
    })
    jest.spyOn(cart, 'getCart').mockResolvedValue(null)
    jest.spyOn(client, 'createClient').mockResolvedValue({
      request: jest.fn().mockResolvedValue({
        type: 'orders',
        id: 'order-123',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    } as unknown as CommerceLayerClient & WithRest)

    const { root, waitForChanges } = await newSpecPage({
      components: [CLCartLink],
      html: '<cl-cart-link>Cart</cl-cart-link>'
    })

    await waitFor(waitForChanges, () => {
      const link = root?.querySelector('a')
      return (
        link?.getAttribute('href') ===
        `https://drop-in-js.commercelayer.app/cart/null?accessToken=${accessToken}`
      )
    })

    root?.querySelector('a')?.click()

    await waitFor(waitForChanges, () => {
      const link = root?.querySelector('a')
      return (
        link?.getAttribute('href') ===
        `https://drop-in-js.commercelayer.app/cart/order-123?accessToken=${accessToken}`
      )
    })

    expect(root).toEqualHtml(`
      <cl-cart-link cl-hydrated target="_self">
        <a href="https://drop-in-js.commercelayer.app/cart/order-123?accessToken=${accessToken}" target="_self">
          Cart
        </a>
      </cl-cart-link>
    `)
  })
})

// sample access token
const accessToken =
  'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJPblZOcUZPTUpuIiwic2x1ZyI6ImRyb3AtaW4tanMiLCJlbnRlcnByaXNlIjp0cnVlLCJyZWdpb24iOiJldS13ZXN0LTEifSwiYXBwbGljYXRpb24iOnsiaWQiOiJkTm5XbWl4eEtHIiwiY2xpZW50X2lkIjoia3VTS1BiZUtiVTlMRzlMam5kemllS1dSY2ZpWEZ1RWZPME9ZSFhLSDlKOCIsImtpbmQiOiJzYWxlc19jaGFubmVsIiwicHVibGljIjp0cnVlfSwibWFya2V0Ijp7ImlkIjpbIkJvd2RHaHdYZGoiXSwic3RvY2tfbG9jYXRpb25faWRzIjpbIkRuZ2VwdU5tT2siLCJLR3lPanV5S1hNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmNvZGU6dXNhIiwiZXhwIjoxNzMwOTEzNjkxLCJ0ZXN0Ijp0cnVlLCJyYW5kIjowLjQ2MjA0OTI5MDY1NTczNTIsImlhdCI6MTczMDkwNjQ5MSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvbW1lcmNlbGF5ZXIuaW8ifQ.OJerreNcfS_QKQ691iKyJqgAemIouRTBHfqmy2mlAt4_GnqtqjEFRW_hE9SNW8h80eUnSDMc4ocOSsHL5nqKZQeXkwlycwtYzNMralEM03jgLDIMvRzfFznZNOXNrySSFPQ9zrIHlbyfW3Wxc8hMEz-SvZ7t0cSlrvSqSEoLBAoMQqsBJkiIVYMWlUmgq_d0dznU4U8MJiPvC-rb32lRinLl3M0TGGApnDTijuQALywGbPkNZzMs3rrK8pz1Gf7ZYVgu9aXUCDEVEac99kTLJj2DJdHMNHYjzupoKu8xSutSAShN8MHaM_9ijuJHmlCdgAfQtEKoGOKpGp7JH8Zl7zeYDkmsdVAqvGAIGNBzHnxb7SdPXmPViq_9u5K9Bq1IBr9K1TwcCyjMTFghnJm6CfDQ60AEPB4dxWHSXNTyGCAcrSwDqni7dgcD3G1Asqb5TmlxOtcmC0jXrZE4TQQZqBUFBiWTXiMhFhq8tGE6PlW0fIZzV9xlKPkaLPKO6rGdmiutmofAB8CVz1ZkmyIaHNR4KbIfWZUVQDEOkCPHzy_yXB7LinYlpDtVlJxZ9n_aetuxmJweLT94LQml56kcmXRPJbNH208ermGKpipQkqM6GoknqtEG3ouVgahjVwD2bSqFGPtZyrYgIzhunupkIhEz1dSLDrk0wXJS9GY4W50'

// const orders: Partial<CommerceLayerClient['orders']> = {
//   create: jest.fn().mockResolvedValue({
//     type: 'orders',
//     id: 'order-123',
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString()
//   })
// }

// const organization: Partial<CommerceLayerClient['organization']> = {
//   retrieve: jest.fn().mockResolvedValue({
//     type: 'organizations',
//     id: 'organization-123',
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString()
//   })
// }
