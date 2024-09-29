import { CollectionAfterChangeHook } from 'payload'
import { resolve } from 'path'
import sql from '@/lib/db'

import { spawn } from 'child_process'

const afterChangeHook: CollectionAfterChangeHook = async ({
  doc, // full document data
  req, // full express request
  previousDoc, // document data before updating the collection
  operation, // name of the operation ie. 'create', 'update'
}) => {
  if (operation === 'create') {
    const { id, filename } = doc

    function runPythonScript(param: string) {
      const pythonProcess = spawn('py', [`${resolve(process.cwd(), 'scripts', 'main.py')}`, param])

      pythonProcess.stdout.on('data', (data: any) => {
        const replacedData = data.toString().replace('```json', '').replace('`', '')
        const parsedData = JSON.parse(replacedData)
        req.payload.create({
          collection: 'candidates',
          data: {
            ...parsedData,
            cv: id,
          },
        })
      })

      pythonProcess.stderr.on('data', (data: any) => {
        console.error(`Error: ${data}`)
      })

      pythonProcess.on('close', (code: any) => {
        console.log(`Python script exited with code: ${code}`)
      })
    }

    runPythonScript(`./media/${filename}`)
  }
}

export default afterChangeHook
