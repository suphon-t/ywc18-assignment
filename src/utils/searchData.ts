import { useMemo } from 'react'
import useSWR from 'swr'

export interface Category {
  name: string
  subcategories: string[]
}

export interface Merchant {
  shopNameTH: string
  categoryName: string
  subcategoryName: string
  coverImageId: string
  facilities: string[]
  priceLevel: number
  isOpen: 'Y' | 'N' | 'N/A'
  highlightText: string
  recommendedItems: string[]
  addressProvinceName: string
  addressDistrictName: string
}

interface CategoryMap {
  [categoryName: string]: Category & {
    subcategorySet: Set<string>
  }
}

export interface SearchData {
  categories: Category[]
  categoryMap: CategoryMap
  provinces: string[]
  priceRange: string[]
  merchants: Merchant[]
}

export interface QueryOptions {
  searchQuery?: string
  category?: string
  province?: string
  price?: string
  subcategory?: string
}

const apiUrl = process.env.REACT_APP_API_URL as string

export function useSearchData(suspense: boolean = true) {
  const { data, ...rest } = useSWR<SearchData>(`${apiUrl}/ywc18.json`, {
    suspense,
    revalidateOnMount: false,
  })
  const categoryMap = useMemo(() => {
    if (!data) return null
    const categoryMap: CategoryMap = {}
    data.categories.forEach((category) => {
      const subcategorySet = new Set<string>()
      category.subcategories.forEach((subcategory) =>
        subcategorySet.add(subcategory)
      )
      categoryMap[category.name] = { ...category, subcategorySet }
    })
    return categoryMap
  }, [data])

  if (data) {
    return {
      data: {
        ...data,
        categoryMap: categoryMap!,
      },
      ...rest,
    }
  } else {
    return { data, ...rest }
  }
}
