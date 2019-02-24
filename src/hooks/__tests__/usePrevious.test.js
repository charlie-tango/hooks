import { testHook } from 'react-testing-library'
import { usePrevious } from '../usePrevious'

it('should return previous value', () => {
  let currentValue = 0
  const { rerender, result } = testHook(() => usePrevious(currentValue))
  expect(result.current).toBe(0)

  currentValue = 1
  rerender()
  expect(result.current).toBe(0)

  currentValue = 2
  rerender()
  expect(result.current).toBe(1)

  currentValue = 0
  rerender()
  expect(result.current).toBe(2)
})
