'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import LanguageSelect from '../LanguageSelect/LanguageSelect'

const fetchSearchResults = async ({ search, language }: { search: string; language: string }) => {
  console.log('debugging 2')
  const response = await fetch(`/api/search?search=${search}&language=${language}`)
  return await response.json()
}

const SearchBar = ({ setCandidates }: { setCandidates: any }) => {
  const [searchState, setSearchState] = React.useState('')

  const query = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchSearchResults({ search: searchState, language: 'en' }),
  })

  const [selectedLanguage, setSelectedLanguage] = React.useState('en')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await query.refetch().then((query) => setCandidates(query.data))

    // Add your search logic here
    console.log(query.data)
  }

  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <h1 className='text-3xl font-bold pb-8'>Search for candidates</h1>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-sm items-center space-x-2 w-[500px]"
      >
        <Input
          type="search"
          placeholder="Search..."
          className="flex-grow"
          onChange={(e) => setSearchState(e.target.value)}
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
        {/* <LanguageSelect
        setSelectedLanguage={setSelectedLanguage}
        selectedLanguage={selectedLanguage}
      /> */}
      </form>
      {query.isFetching && <p className='pb-4'>Loading...</p>}
    </div>
  )
}

export default SearchBar
