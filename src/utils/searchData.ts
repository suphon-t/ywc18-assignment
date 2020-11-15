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

export interface SearchData {
  categories: Category[]
  provinces: string[]
  priceRange: string[]
  merchants: Merchant[]
}

const apiUrl = process.env.REACT_APP_API_URL as string

export function useSearchData() {
  return useSWR<SearchData>(`${apiUrl}/ywc18.json`, { suspense: true })
}
