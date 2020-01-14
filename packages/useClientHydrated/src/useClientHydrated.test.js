import { renderHook } from '@testing-library/react-hooks'
import useClientHydrated from './useClientHydrated'

it('should update hydrated state after first render', () => {
  let hookOutput = renderHook(() => useClientHydrated())
  expect(hookOutput.result.current).toBe(false)
  hookOutput = renderHook(() => useClientHydrated())
  expect(hookOutput.result.current).toBe(true)
})
