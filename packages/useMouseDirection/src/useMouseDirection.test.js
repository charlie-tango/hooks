import { renderHook } from '@testing-library/react-hooks'
import useMouseDirection from './useMouseDirection'

it('should execute the useMouseDirection hook', () => {
  const { result } = renderHook(() => useMouseDirection())
  const [ refSetter, direction ] = result.current
  expect(refSetter).toBeInstanceOf(Function)
  expect(direction).toHaveProperty('x')
  expect(direction).toHaveProperty('y')
})
