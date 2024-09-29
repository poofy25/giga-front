'use client'

import { Candidate as CandidateType } from '@/payload-types'

interface CandidateTypeExtended extends CandidateType {
  accuracy: number
}

import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Link as LinkSvg, PaperclipIcon } from 'lucide-react'

const Candidate = ({ candidateData }: { candidateData: CandidateTypeExtended }) => {
  return (
    <AccordionItem
      value={String(Math.random())}
      key={Math.random()}
      className="border-b w-[900px]  last:border-b-0"
    >
      <AccordionTrigger className="hover:no-underline hover:bg-muted/50 transition-colors px-4">
        <div className="flex w-full text-left">
          <div className="flex-1">{candidateData.name}</div>
          <div className="flex-1">{candidateData.accuracy}%</div>
          <div className="pr-4">
            {candidateData.cv && (
              <Link
                href={candidateData.cv.url || ''}
                download={candidateData.cv}
                target="_blank"
                className="text-[14px] bg-neutral-200 rounded-[5px] p-1 font-normal flex items-center justify-center gap-[8px]"
              >
                <PaperclipIcon className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 py-2 bg-neutral-50 overflow-x-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <p className="font-semibold">Informatii generale</p>
            <div className="flex gap-2 text-[12px]">
              <p>Nume:</p>
              <p>{candidateData.name || '-'}</p>
            </div>
            <div className="flex gap-2 text-[12px]">
              <p>Varsta :</p>
              <p>{candidateData.age || '-'}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold">Contacte</p>
            <div className="flex gap-2 text-[12px]">
              <p>Email:</p>
              <p>{candidateData.email || '-'}</p>
            </div>
            <div className="flex gap-2 text-[12px]">
              <p>Phone :</p>
              <p>{candidateData.phone || '-'}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold">Experienta de lucru</p>
            <div className="flex gap-2 text-[12px]">
              <pre>{JSON.stringify(candidateData.work_experience, null, 2)}</pre>
            </div>
           
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold">Educatie</p>
            <div className="flex gap-2 text-[12px]">
              <pre>{JSON.stringify(candidateData.education, null, 2)}</pre>
            </div>
           
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default Candidate
