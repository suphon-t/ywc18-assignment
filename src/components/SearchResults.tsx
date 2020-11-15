import React from 'react'
import { useSearchData } from '../utils/searchData'
import { MerchantCard } from './MerchantCard'

export function SearchResults() {
  const { data } = useSearchData()
  const { merchants, priceRange } = data!

  return (
    <div>
      {merchants.map((merchant) => (
        <MerchantCard
          key={merchant.shopNameTH}
          merchant={merchant}
          priceRange={priceRange.length}
        />
      ))}
    </div>
  )
}
