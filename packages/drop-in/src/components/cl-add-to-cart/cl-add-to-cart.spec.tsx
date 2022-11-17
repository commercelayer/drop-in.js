import { newSpecPage } from '@stencil/core/testing'
import { CLAddToCart } from './cl-add-to-cart'
import * as skus from '#apis/commercelayer/skus'

const baseSku = {
  id: 'id1234',
  type: 'skus',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
} as const

const availableSku: skus.Sku = {
  ...baseSku,
  inventory: {
    levels: [],
    available: true,
    quantity: 98
  }
}

const doNotTrackSku: skus.Sku = {
  ...baseSku,
  do_not_track: true,
  inventory: {
    levels: [],
    available: true
  }
}

const unavailableSku: skus.Sku = {
  ...baseSku,
  inventory: {
    levels: [],
    available: false,
    quantity: 0
  }
}

describe('cl-add-to-cart.spec', () => {
  it('renders as disabled when created without attributes', async () => {
    const { root } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart>Add to cart</cl-add-to-cart>'
    })
    expect(root).toEqualHtml(`
      <cl-add-to-cart quantity="1" aria-disabled="true" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders with the default quantity set to 1', async () => {
    jest.spyOn(skus, 'getSku').mockResolvedValue(availableSku)

    const { root } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="SKU1234">Add to cart</cl-add-to-cart>'
    })
    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="SKU1234" quantity="1" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders as disabled when providing an invalid quantity', async () => {
    jest.spyOn(skus, 'getSku').mockResolvedValue(availableSku)

    const { root } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="SKU1234" quantity="-3">Add to cart</cl-add-to-cart>'
    })
    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="SKU1234" quantity="-3" aria-disabled="true" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders with a provided quantity', async () => {
    jest.spyOn(skus, 'getSku').mockResolvedValue(availableSku)

    const { root } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="SKU1234" quantity="8">Add to cart</cl-add-to-cart>'
    })
    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="SKU1234" quantity="8" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders properly when attributes change', async () => {
    jest.spyOn(skus, 'getSku').mockResolvedValue(availableSku)

    const { root, waitForChanges } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="SKU1234" quantity="8">Add to cart</cl-add-to-cart>'
    })

    root?.setAttribute('sku', 'NEWSKUABCD')
    root?.setAttribute('quantity', '4')
    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="NEWSKUABCD" quantity="4" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)

    root?.setAttribute('quantity', '-3')
    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="NEWSKUABCD" quantity="0" aria-disabled="true" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders disabled when item is out of stock', async () => {
    jest.spyOn(skus, 'getSku').mockResolvedValue(unavailableSku)

    const { root, waitForChanges } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="SKU1234">Add to cart</cl-add-to-cart>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="SKU1234" quantity="1" aria-disabled="true" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders disabled when item has less than available quantity', async () => {
    jest.spyOn(skus, 'getSku').mockResolvedValue(availableSku)

    const { root, waitForChanges } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="SKU1234" quantity="99">Add to cart</cl-add-to-cart>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="SKU1234" quantity="99" aria-disabled="true" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders enabled when item has "do_not_track" attribute set to true', async () => {
    jest.spyOn(skus, 'getSku').mockResolvedValue(doNotTrackSku)

    const { root, waitForChanges } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="SKU1234" quantity="99">Add to cart</cl-add-to-cart>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="SKU1234" quantity="99" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })
})
