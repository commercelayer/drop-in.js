import { newSpecPage } from '@stencil/core/testing'
import { CLAddToCart } from './cl-add-to-cart'

describe('cl-add-to-cart.spec', () => {
  it('renders without attributes', async () => {
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
    const { root } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="BACKPACK818488000000XXXX">Add to cart</cl-add-to-cart>'
    })
    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="BACKPACK818488000000XXXX" quantity="1" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders disabled when providing an invalid quantity', async () => {
    const { root } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="BACKPACK818488000000XXXX" quantity="-3">Add to cart</cl-add-to-cart>'
    })
    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="BACKPACK818488000000XXXX" quantity="-3" aria-disabled="true" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders with a provided quantity', async () => {
    const { root } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="BACKPACK818488000000XXXX" quantity="8">Add to cart</cl-add-to-cart>'
    })
    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="BACKPACK818488000000XXXX" quantity="8" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })

  it('renders properly when attributes change', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [CLAddToCart],
      html: '<cl-add-to-cart sku="BACKPACK818488000000XXXX" quantity="8">Add to cart</cl-add-to-cart>'
    })

    root?.setAttribute('sku', 'APRONXXXFFFFFF000000XXXX')
    root?.setAttribute('quantity', '4')
    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="APRONXXXFFFFFF000000XXXX" quantity="4" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)

    root?.setAttribute('quantity', '-3')
    await waitForChanges()

    expect(root).toEqualHtml(`
      <cl-add-to-cart sku="APRONXXXFFFFFF000000XXXX" quantity="0" aria-disabled="true" role="button" tabindex="0">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Add to cart
      </cl-add-to-cart>
    `)
  })
})
