'use client'
import SearchBar from '@/components/main/SearchBar/SearchBar'
import LanguageSelect from '@/components/main/LanguageSelect/LanguageSelect'

import CandidatesTable from '@/components/main/Table/CandidatesTable'
import { useState } from 'react'

import { Candidate as CandidateType } from '@/payload-types'
interface CandidateTypeExtended extends CandidateType {
  accuracy: number
}

const Page = ({ params }: { params: any }) => {

    const [candidates, setCandidates] = useState<CandidateTypeExtended[]>([])

  return (
    <main className="w-full ">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <SearchBar setCandidates={setCandidates} />
        <CandidatesTable candidates={candidates} />
      </div>
    </main>
  )
}

export default Page
