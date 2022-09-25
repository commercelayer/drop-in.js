import { newSpecPage } from '@stencil/core/testing';
import { CLPrice } from './cl-price';

describe('cl-price', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CLPrice],
      html: '<cl-price></cl-price>',
    });
    expect(root).toEqualHtml(`
      <cl-price>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </cl-price>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [CLPrice],
      html: `<cl-price first="Stencil" last="'Don't call me a framework' JS"></cl-price>`,
    });
    expect(root).toEqualHtml(`
      <cl-price first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </cl-price>
    `);
  });
});
