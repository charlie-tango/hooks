import { renderHook } from '@testing-library/react-hooks'
import useMouseDirection from './useMouseDirection'

it('should execute the useMouseDirection hook', () => {
  const { result } = renderHook(() => useMouseDirection())
  expect(result).toBe('👋')
})
