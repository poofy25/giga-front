'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'ro', name: 'Română' },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
]

const LanguageSelect = ({
  setSelectedLanguage,
  selectedLanguage,
}: {
  setSelectedLanguage: (value: string) => void
  selectedLanguage: string
}) => {
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
    // Add your language change logic here
    console.log(`Language changed to: ${value}`)
  }

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[180px]">
        <Globe className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LanguageSelect
