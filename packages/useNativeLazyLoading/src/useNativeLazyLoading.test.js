import { renderHook } from '@testing-library/react-hooks'
import useNativeLazyLoading from './useNativeLazyLoading'

const initialValue = HTMLImageElement.prototype.loading

afterEach(() => {
  if (initialValue) {
    HTMLImageElement.prototype.loading = initialValue
  } else {
    delete HTMLImageElement.prototype.loading
  }
})

it('should execute the useNativeLazyLoading hook', () => {
  delete HTMLImageElement.prototype.loading
  const { result } = renderHook(() => useNativeLazyLoading())
  expect(result.current).toBe(false)
})

it('should execute the useNativeLazyLoading hook with support', () => {
  HTMLImageElement.prototype.loading = 'defined'
  const { result } = renderHook(() => useNativeLazyLoading())
  expect(result.current).toBe(true)
})
