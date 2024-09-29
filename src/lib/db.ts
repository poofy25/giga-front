import postgres from 'postgres'

const connectionString = process.env.DATABASE_URI
const sql = postgres(connectionString as string)

export default sql