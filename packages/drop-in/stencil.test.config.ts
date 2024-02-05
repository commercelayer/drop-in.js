import type { Config } from '@stencil/core'
import { config as generalConfig } from './stencil.config'

export const config: Config = {
  ...generalConfig,

  outputTargets: [
    {
      type: 'dist',
      empty: false
    }
  ],

  testing: {
    browserHeadless: 'new',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
  }
}
