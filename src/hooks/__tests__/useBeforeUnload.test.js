import React from 'react'
import { testHook, fireEvent } from 'react-testing-library'
import { useBeforeUnload } from '../useBeforeUnload'

it('should catch the unload event', () => {
  testHook(() => useBeforeUnload())
  const e = new Event('beforeunload')
  fireEvent(window, e)
})
