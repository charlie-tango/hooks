import { renderHook } from '@testing-library/react-hooks'
import useMouseClosestEdge from './useMouseClosestEdge'

it('should execute the useMouseClosestEdge hook', () => {
  const { result } = renderHook(() => useMouseClosestEdge())
  const [ refSetter, position ] = result.current
  expect(refSetter).toBeInstanceOf(Function)
  expect(position).toHaveProperty('x')
  expect(position).toHaveProperty('y')
})
