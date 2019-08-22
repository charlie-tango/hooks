import useScript, { ScriptStatus } from './useScript'
import { fireEvent } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'

const url = 'https://external.api/api.js'

afterEach(() => {
  document.head.querySelectorAll('script').forEach(script => {
    script.remove()
  })
})

it('should load the external script', () => {
  const { result, rerender } = renderHook(() => useScript(url))
  let script = document.querySelector(`script[src="${url}"]`)
  expect(script).toBeDefined()

  expect(result.current[0]).toBe(false)
  expect(result.current[1]).toBe(ScriptStatus.LOADING)

  // Fire the load event
  act(() => {
    fireEvent(script, new Event('load'))
  })
  rerender()
  expect(script).toHaveAttribute('data-status', ScriptStatus.READY)
  expect(result.current[0]).toBe(true)
  expect(result.current[1]).toBe(ScriptStatus.READY)
})

it('should handle errors when loading', () => {
  const { result, rerender } = renderHook(() => useScript(url))
  let script = document.querySelector(`script[src="${url}"]`)
  expect(script).toBeDefined()

  act(() => {
    // Fire the error event
    fireEvent(script, new Event('error'))
  })

  rerender()
  expect(script).toHaveAttribute('data-status', ScriptStatus.ERROR)
  expect(result.current[0]).toBe(false)
  expect(result.current[1]).toBe(ScriptStatus.ERROR)
})

it('should not create more then one script entry', () => {
  renderHook(() => useScript(url))
  renderHook(() => useScript(url))
  renderHook(() => useScript(url))

  let scripts = document.querySelectorAll(`script[src="${url}"]`)
  expect(scripts).toHaveLength(1)
})
