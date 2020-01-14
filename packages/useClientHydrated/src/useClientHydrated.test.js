import { renderHook } from '@testing-library/react-hooks'
import useClientHydrated from './useClientHydrated'

it('should execute the useClientHydrated hook', () => {
  const { result } = renderHook(() => useClientHydrated())
  expect(result).toBe('👋')
})
