import React, { useMemo } from 'react'
import { Merchant, QueryOptions, useSearchData } from '../utils/searchData'
import { MerchantCard } from './MerchantCard'

interface SearchResultsProps {
  options: QueryOptions
}

type MerchantPredicate = (merchant: Merchant) => boolean

export function SearchResults({ options }: SearchResultsProps) {
  const { data } = useSearchData()
  const { merchants, categoryMap, priceRange } = data!

  const filtered = useMemo(() => {
    const {
      searchQuery,
      category: categoryName,
      province,
      price,
      subcategory,
    } = options
    const category = categoryName && categoryMap[categoryName]
    const predicates: MerchantPredicate[] = []

    if (searchQuery) {
      const searchQueryLowerCase = searchQuery.toLowerCase()
      predicates.push((merchant) =>
        merchant.shopNameTH.toLowerCase().includes(searchQueryLowerCase)
      )
    }
    if (category) {
      predicates.push((merchant) =>
        category.subcategorySet.has(merchant.subcategoryName)
      )
    }
    if (province) {
      predicates.push((merchant) => merchant.addressProvinceName === province)
    }
    if (price) {
      predicates.push((merchant) => merchant.priceLevel === parseInt(price))
    }
    if (subcategory) {
      predicates.push((merchant) => merchant.subcategoryName === subcategory)
    }

    return merchants.filter((merchant) =>
      predicates.every((predicate) => predicate(merchant))
    )
  }, [merchants, categoryMap, options])

  return (
    <div style={{ flex: 1 }}>
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
