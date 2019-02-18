import React from 'react'
import { render } from 'react-testing-library'
import { usePrevious } from '../usePrevious'

const HookComponent = ({ value }) => {
  const previousValue = usePrevious(value)
  return (
    <h1>
      now: {value}, before: {previousValue}
    </h1>
  )
}

it('should return previous value', () => {
  const { rerender, getByText } = render(<HookComponent value={0} />)
  getByText('now: 0, before: 0')
  rerender(<HookComponent value={1} />)
  getByText('now: 1, before: 0')
  rerender(<HookComponent value={2} />)
  getByText('now: 2, before: 1')
  rerender(<HookComponent value={0} />)
  getByText('now: 0, before: 2')
})
