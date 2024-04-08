import { newSpecPage } from '@stencil/core/testing'
import { CLAddToCart } from './cl-add-to-cart'
import * as skus from '#apis/commercelayer/skus'
import type { Sku } from '#apis/types'

const baseSku = (id: string): Sku => {
  return {
    id,
    code: id,
    name: id,
    type: 'skus',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
}

const skuList: { [code: string]: Sku } = {
  AVAILABLE123: {
    ...baseSku('AVAILABLE123'),
    inventory: {
      levels: [],
      available: true,
      quantity: 98
    }
  },
  DONOTTRACK456: {
    ...baseSku('DONOTTRACK456'),
    do_not_track: true,
    inventory: {
      levels: [],
      available: true
    }
  },
  UNAVAILABLE789: {
    ...baseSku('UNAVAILABLE789'),
    inventory: {
      levels: [],
      available: false,
      quantity: 0
    }
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
    jest
      .spyOn(skus, 'getSku')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(skuList[sku])
      )

    const { root } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart code="AVAILABLE123">Add to cart</cl-add-to-cart>'
    })
    expect(root).toEqualHtml(`
      <cl-add-to-cart code="AVAILABLE123" quantity="1" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders as disabled when providing an invalid quantity', async () => {
    jest
      .spyOn(skus, 'getSku')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(skuList[sku])
      )

    const { root } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart code="AVAILABLE123" quantity="-3">Add to cart</cl-add-to-cart>'
    })
    expect(root).toEqualHtml(`
      <cl-add-to-cart code="AVAILABLE123" quantity="0" aria-disabled="true" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders with a provided quantity', async () => {
    jest
      .spyOn(skus, 'getSku')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(skuList[sku])
      )

    const { root } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart code="AVAILABLE123" quantity="8">Add to cart</cl-add-to-cart>'
    })
    expect(root).toEqualHtml(`
      <cl-add-to-cart code="AVAILABLE123" quantity="8" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders properly when "code" attribute changes', async () => {
    jest
      .spyOn(skus, 'getSku')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(skuList[sku])
      )

    const { root, waitForChanges } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart code="AVAILABLE123" quantity="8">Add to cart</cl-add-to-cart>'
    })

    root?.setAttribute('code', 'UNAVAILABLE789')
    root?.setAttribute('quantity', '4')
    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart code="UNAVAILABLE789" quantity="4" aria-disabled="true" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders properly when "quantity" attribute changes', async () => {
    jest
      .spyOn(skus, 'getSku')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(skuList[sku])
      )

    const { root, waitForChanges } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart code="AVAILABLE123" quantity="8">Add to cart</cl-add-to-cart>'
    })

    root?.setAttribute('quantity', '-3')
    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart code="AVAILABLE123" quantity="0" aria-disabled="true" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders properly when "frequency" attribute is set', async () => {
    jest
      .spyOn(skus, 'getSku')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(skuList[sku])
      )

    const { root, waitForChanges } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart code="AVAILABLE123" frequency="three-month">Add to cart</cl-add-to-cart>'
    })

    root?.setAttribute('frequency', 'six-month')
    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart code="AVAILABLE123" frequency="six-month" quantity="1" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders disabled when item is out of stock', async () => {
    jest
      .spyOn(skus, 'getSku')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(skuList[sku])
      )

    const { root, waitForChanges } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart code="UNAVAILABLE789">Add to cart</cl-add-to-cart>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart code="UNAVAILABLE789" quantity="1" aria-disabled="true" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders disabled when item has less than available quantity', async () => {
    jest
      .spyOn(skus, 'getSku')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(skuList[sku])
      )

    const { root, waitForChanges } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart code="AVAILABLE123" quantity="99">Add to cart</cl-add-to-cart>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart code="AVAILABLE123" quantity="99" aria-disabled="true" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders enabled when item has "do_not_track" attribute set to true', async () => {
    jest
      .spyOn(skus, 'getSku')
      .mockImplementation(
        async (sku: string) => await Promise.resolve(skuList[sku])
      )

    const { root, waitForChanges } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart code="DONOTTRACK456" quantity="99">Add to cart</cl-add-to-cart>'
    })

    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart code="DONOTTRACK456" quantity="99" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })
})
