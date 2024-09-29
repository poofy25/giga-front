const dynamic = 'dynamic'

import { NextResponse, NextRequest } from 'next/server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import sql from '@/lib/db'

import { calculateSimilarity, getRankedCandidates } from '@/lib/libs'

const type = `name?: string | null;
    age?: string | null;
    email?: string | null;
    phone?: string | null;
    work_experience?:
        | {
            work_role?: string | null;
            work_period?: string | null;
            work_responsabilites?: string | null;
        }[]
        | null;
    education?:
        | {
            education_institution?: string | null;
            education_period?: string | null;
        }[]
        | null;
    languages?:
        | {
            language_name?: string | null;
            language_level?: string | null;
        }[]
        | null;
    skills?: string | null;`

export async function GET(request: NextRequest) {
  const searchParam = request.nextUrl.searchParams.get('search')

  const payload = await getPayloadHMR({ config })

  const { docs } = await payload.find({
    collection: 'candidates',
    depth: 2,
    pagination: false,
  })

  const rankedCandidates = await getRankedCandidates(docs, searchParam || '')

  return NextResponse.json([...rankedCandidates])
}

/* 
so o have a database table name candidates where i store al my candidates cvs typed by this type: 
type CV = {
  id: number // primary key
  cv: number // foreign key
  name?: string | null;
  age?: string | null;
    email?: string | null;
    phone?: string | null;
    work_experience?:
        | {
            work_role?: string | null;
            work_period?: string | null;
            work_responsabilites?: string | null;
        }[]
        | null;
    education?:
        | {
            education_institution?: string | null;
            education_period?: string | null;
        }[]
        | null;
    languages?:
        | {
            language_name?: string | null;
            language_level?: string | null;
        }[]
        | null;
    skills?: string | null;
}

Please generate me a sql query that will analyse enire table and will select only those ho have best experience 5 and more yers and are very good english speakers.



*/
