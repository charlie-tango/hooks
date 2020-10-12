import { renderHook } from '@testing-library/react-hooks'
import useLazyRef from './useLazyRef'

it('should execute the useLazyRef hook', () => {
  let renders = 0

  const { result, rerender } = renderHook(() =>
    useLazyRef(() => ({
      message: 'Lazy Value',
      renders: ++renders,
    })),
  )
  expect(result.current.message).toBe('Lazy Value')
  expect(result.current.renders).toBe(1)

  // Rerendering should keep the same instance
  rerender()
  expect(result.current.renders).toBe(1)
})
