import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useSearchData } from '../utils/searchData'
import { MerchantCard } from './MerchantCard'

interface QueryOptions {
  searchQuery?: string
}

export function SearchResults() {
  const { data } = useSearchData()
  const { merchants, priceRange } = data!
  const { search } = useLocation()

  const filtered = useMemo(() => {
    const { searchQuery }: QueryOptions = queryString.parse(search)
    return merchants.filter((merchant) => {
      let matches = true

      if (
        searchQuery &&
        !merchant.shopNameTH.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        matches = false
      }

      return matches
    })
  }, [merchants, search])

  return (
    <div>
      {filtered.map((merchant) => (
        <MerchantCard
          key={merchant.shopNameTH}
          merchant={merchant}
          priceRange={priceRange.length}
        />
      ))}
    </div>
  )
}
