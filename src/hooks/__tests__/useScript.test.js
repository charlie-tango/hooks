import React from 'react'
import { useScript } from '../useScript'
import { render, fireEvent } from 'react-testing-library'

const url = 'https://external.api/api.js'

const HookComponent = props => {
  const ready = useScript(props.url)
  return <div>{ready.toString()}</div>
}

afterEach(() => {
  document.head.querySelectorAll('script').forEach(script => {
    script.remove()
  })
})

it('should load the external script', () => {
  const { rerender, getByText } = render(<HookComponent url={url} />)
  let script = document.querySelector(`script[src="${url}"]`)
  expect(script).toBeDefined()

  // Fire the load event
  fireEvent(script, new Event('load'))
  rerender(<HookComponent url={url} />)
  expect(script).toHaveAttribute('data-loaded', 'true')
  getByText('true')
})

it('should handle errors when loading', () => {
  const { rerender } = render(<HookComponent url={url} />)
  let script = document.querySelector(`script[src="${url}"]`)
  expect(script).toBeDefined()

  // Fire the error event
  fireEvent(script, new Event('error'))

  rerender(<HookComponent url={url} />)
  expect(script).toHaveAttribute('data-failed', 'true')
})

it('should not create more then one script entry', () => {
  render(
    <>
      <HookComponent url={url} />
      <HookComponent url={url} />
    </>,
  )

  let scripts = document.querySelectorAll(`script[src="${url}"]`)
  expect(scripts).toHaveLength(1)
})
