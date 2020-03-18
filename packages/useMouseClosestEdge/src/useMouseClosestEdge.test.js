import { renderHook } from '@testing-library/react-hooks'
import useMouseClosestEdge from './useMouseClosestEdge'

it('should execute the useMouseClosestEdge hook', () => {
  const { result } = renderHook(() => useMouseClosestEdge())
  expect(result).toBe('👋')
})
