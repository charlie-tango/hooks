import { useScript } from './useScript'
import { fireEvent, testHook } from 'react-testing-library'

const url = 'https://external.api/api.js'

afterEach(() => {
  document.head.querySelectorAll('script').forEach(script => {
    script.remove()
  })
})

it('should load the external script', () => {
  const { result, rerender } = testHook(() => useScript(url))
  let script = document.querySelector(`script[src="${url}"]`)
  expect(script).toBeDefined()

  // Fire the load event
  fireEvent(script, new Event('load'))
  rerender()
  expect(script).toHaveAttribute('data-loaded', 'true')
  expect(result.current).toBe(true)
})

it('should handle errors when loading', () => {
  const { result, rerender } = testHook(() => useScript(url))
  let script = document.querySelector(`script[src="${url}"]`)
  expect(script).toBeDefined()

  // Fire the error event
  fireEvent(script, new Event('error'))

  rerender()
  expect(script).toHaveAttribute('data-failed', 'true')
  expect(result.current).toBe(false)
})

it('should not create more then one script entry', () => {
  testHook(() => useScript(url))
  testHook(() => useScript(url))
  testHook(() => useScript(url))

  let scripts = document.querySelectorAll(`script[src="${url}"]`)
  expect(scripts).toHaveLength(1)
})
