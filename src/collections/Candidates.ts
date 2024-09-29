import type { CollectionConfig } from 'payload'

export const Candidates: CollectionConfig = {
  slug: 'candidates',
  fields: [
    {
      name: 'cv',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'age',
      type: 'text',
    },
    {
      name: 'work_experience',
      type: 'array',
      fields: [
        {
          name: 'work_role',
          type: 'text',
        },
        {
          name: 'work_period',
          type: 'text',
        },
        {
          name: 'work_responsabilites',
          type: 'text',
        },
      ],
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        {
          name: 'education_institution',
          type: 'text',
        },
        {
          name: 'education_period',
          type: 'text',
        },
      ],
    },
    {
      name: 'languages',
      type: 'array',
      fields: [
        {
          name: 'language_name',
          type: 'text',
        },
        {
          name: 'language_level',
          type: 'text',
        },
      ],
    },
    {
      name: 'skills',
      type: 'text',
    },
  ],
}

/* 
{
  id: number, // primary key
  cv: id_from_table_cvs, // foreign key
  name: string,
  surname: string,
  age: number,
  email: string,
  phone: string,
  sex: ['-', 'm', 'f'],
  
}
*/
