import type { CollectionConfig } from 'payload'

import afterChangeHook from './hooks/afterChangeHook'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [

  ],
  hooks:{
    afterChange: [afterChangeHook]
  },
  upload: true,
}
