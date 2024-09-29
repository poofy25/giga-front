// import { compareTwoStrings } from 'string-similarity'
// import { createInterface } from 'readline'

// import { Candidate } from '@/payload-types'

// export function calculateSimilarity(str1: string, str2: string) {
//   // Convert strings to lowercase for case-insensitive comparison
//   str1 = str1.toLowerCase()
//   str2 = str2.toLowerCase()

//   // Calculate similarity
//   const similarity = compareTwoStrings(str1, str2)

//   // Convert to percentage
//   const similarityPercentage = similarity * 100

//   return similarityPercentage
// }

// export function getRankedCandidates(candidates: Candidate[], searchTerm: string) {
//   const rankedCandidates = candidates
//     .map((candidate) => {
//       const similarity = calculateSimilarity(
//         JSON.stringify([candidate.work_experience, candidate.languages]).toLowerCase(),
//         searchTerm.toLowerCase(),
//       )
//       return { ...candidate, accuracy: Number(similarity.toFixed(2)) }
//     })
//     .sort((a, b) => b.accuracy - a.accuracy)
//   console.log(rankedCandidates[0])
//   return rankedCandidates
// }

// //     input: process.stdin,
// //     output: process.stdout
// // });

// // rl.question('Enter the first string: ', (string1) => {
// //     rl.question('Enter the second string: ', (string2) => {
// //         const similarity = calculateSimilarity(string1, string2);
// //         console.log(`The similarity between the two strings is: ${similarity.toFixed(2)}%`);
// //         rl.close();
// //     });
// // });

import { compareTwoStrings } from 'string-similarity'

import { Candidate } from '@/payload-types'

async function crate_perferct_agent(cv_prompt: any) {
  const base_url = 'https://hercai.onrender.com/turbo/hercai'
  // Define the data pattern for the candidate profile
  const param = `
    Returneaza joburi similare dupa aceasta schema in romana :
    [
        [{
          "work_role": ,
}],

    Exemplu : [{work_role:"Programator"},{work_role:"Manager Programare"},,{work_role:"Profesor programator"}]


    Descrierea jobu-ului : 
  `
  // Create the full URL with the prompt and parameter
  const full_url = `${base_url}/?question=${encodeURIComponent(param + cv_prompt)}`
  console.log(full_url)
  try {
    // Make the GET request using fetch
    const response = await fetch(full_url)
    // Check if the request was successful
    if (response.ok) {
      const data = await response.json()
      // Output the reply to the console
      return data.reply
    } else {
      console.error(`Error: ${response.status}`)
    }
  } catch (error) {
    console.error(`Request failed: ${error}`)
  }
}

export function calculateSimilarity(str1: string, str2: string) {
  // Convert strings to lowercase for case-insensitive comparison
  str1 = str1.toLowerCase()
  str2 = str2.toLowerCase()
  // Calculate similarity
  const similarity = compareTwoStrings(str1, str2)
  // Convert to percentage
  const similarityPercentage = similarity * 100
  return similarityPercentage
}

export async function getRankedCandidates(candidates: Candidate[], searchTerm: string) {
  const perfectAgent = await crate_perferct_agent(searchTerm.toLowerCase())

  const rankedCandidates = candidates
    .map((candidate) => {
      const candidateJobTitles = candidate?.work_experience.map((workExperience) => {
        return { work_role: workExperience.work_role }
      })

      const similarity = calculateSimilarity(
        JSON.stringify([candidateJobTitles]).toLowerCase(),
        JSON.stringify([perfectAgent]).toLowerCase(),
      )
      return { ...candidate, accuracy: Number(similarity.toFixed(2)) }
    })
    .sort((a, b) => b.accuracy - a.accuracy)
  return rankedCandidates
}

//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('Enter the first string: ', (string1) => {
//     rl.question('Enter the second string: ', (string2) => {
//         const similarity = calculateSimilarity(string1, string2);
//         console.log(`The similarity between the two strings is: ${similarity.toFixed(2)}%`);
//         rl.close();
//     });
// });
