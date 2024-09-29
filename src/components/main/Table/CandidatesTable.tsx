import { Candidate as CandidateType } from '@/payload-types'
interface CandidateTypeExtended extends CandidateType {
  accuracy: number
}

import Candidate from '../Candidate/Candidate'
import { Accordion } from '@/components/ui/accordion'

const CandidatesTable = ({ candidates }: { candidates: CandidateTypeExtended[] }) => {
  return (
    <div>
      <Accordion type="single" collapsible>
        {candidates.map((candidate, index) => (
          <Candidate key={index} candidateData={candidate} />
        ))}
      </Accordion>
    </div>
  )
}

export default CandidatesTable
