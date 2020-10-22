// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { render } from '@testing-library/react'
import useId, { IdProvider, resetLocalId } from './useId'

const Id = ({ prefix }) => {
  const id = useId(prefix)
  return <span data-testid={id}>{id}</span>
}

afterEach(() => {
  resetLocalId()
})

it('should execute the useId hook', () => {
  const { getByTestId } = render(
    <IdProvider>
      <Id />
      <Id />
      <Id />
    </IdProvider>,
  )

  getByTestId('1')
  getByTestId('2')
  getByTestId('3')
})

it('should execute the useId hook with prefix', () => {
  const { getByTestId } = render(
    <IdProvider>
      <Id prefix="prefix" />
      <Id prefix="prefix" />
      <Id prefix="prefix" />
    </IdProvider>,
  )

  getByTestId('prefix_1')
  getByTestId('prefix_2')
  getByTestId('prefix_3')
})
