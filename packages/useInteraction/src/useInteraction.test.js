// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { Example } from './useInteraction.story'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/dom'

it('should handle hovering', () => {
  const cb = jest.fn()
  render(<Example label="Interaction box" onInteraction={cb} />)
  const button = screen.getByRole('button')
  userEvent.hover(button)

  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      hover: true,
    }),
  )

  userEvent.unhover(button)

  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      hover: false,
    }),
  )
})

it('should handle focus', () => {
  const cb = jest.fn()
  render(<Example label="Interaction box" onInteraction={cb} />)
  const button = screen.getByRole('button')

  fireEvent.focus(button)
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      focus: true,
      focusWithin: false,
    }),
  )

  fireEvent.focusIn(button)
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      focus: true,
      focusWithin: true,
    }),
  )

  fireEvent.focusOut(button)
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      focus: true,
      focusWithin: false,
    }),
  )

  fireEvent.blur(button)
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      focus: false,
      focusWithin: false,
    }),
  )
})

it('should handle active', () => {
  const cb = jest.fn()
  render(<Example label="Interaction box" onInteraction={cb} />)
  const button = screen.getByRole('button')

  fireEvent.mouseDown(button)
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      active: true,
    }),
  )

  fireEvent.mouseUp(button)
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      active: false,
    }),
  )

  fireEvent.touchStart(button)
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      active: true,
    }),
  )

  fireEvent.touchEnd(button)
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      active: false,
    }),
  )
})

it('should skip events', () => {
  const cb = jest.fn()
  render(<Example label="Interaction box" onInteraction={cb} skip />)
  const button = screen.getByRole('button')

  userEvent.hover(button)
  expect(cb).not.toHaveBeenCalled()
})
