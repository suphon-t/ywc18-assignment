import { ChangeEventHandler, useCallback, useMemo, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'

type StateResult<T> = [
  T,
  (newValue: T) => void,
  ChangeEventHandler<{ value: unknown }>
]

export function useQueryState(
  key: string,
  defaultValue: string
): StateResult<string> {
  const { replace } = useHistory()
  const { pathname, search } = useLocation()
  const query = useMemo(() => {
    return queryString.parse(search)
  }, [search])

  const value = (query[key] as string) || defaultValue

  const state = useRef({ pathname, query })
  state.current = { pathname, query }

  const setValue = useCallback(
    (newValue: string) => {
      const { pathname, query } = state.current
      const newQuery = { ...query, [key]: newValue }
      if (newValue === defaultValue) {
        delete newQuery[key]
      }
      const stringified = queryString.stringify(newQuery)
      if (stringified.length > 0) {
        replace(`${pathname}?${stringified}`)
      } else {
        replace(`${pathname}`)
      }
    },
    [defaultValue, key, replace]
  )

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setValue(e.target.value)
    },
    [setValue]
  )

  return [value, setValue, handleChange]
}
