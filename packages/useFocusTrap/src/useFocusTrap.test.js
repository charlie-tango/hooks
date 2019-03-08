import { renderHook } from 'react-hooks-testing-library'
import useFocusTrap from './useFocusTrap'

it('should execute the useFocusTrap hook', () => {
  renderHook(() => useFocusTrap())
})
