# useFocusTrap

Trap keyboard focus inside a DOM element, to prevent the user navigating outside a modal.
When using this, make sure to combine it with a fixed position `<Backdrop>` that prevents the mouse from clicking input elements.

> Checkout the [Storybook](https://ct-hooks.now.sh/?path=/story/usefocustrap--readme) demo.

## Installation

```sh
yarn add @charlietango/use-focus-trap
```

## API

```js
const ref = useFocusTrap(active, options)
```

The `useFocusTrap` hook returns a `ref` that you should assign to the DOM element that needs to trap focus.
Anything outside that element, will no longer be able to receive focus.

You can toggle the trap by setting the `active` boolean. By default it's activated once the `ref` is assigned.

### Options

The focus trap accepts an object with these optional options, that give you a bit more control.

| Name                 | Type                     | Default     | Required | Description                                                                                                                                                       |
| -------------------- | ------------------------ | ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **focusSelector**    | `string` / `HTMLElement` | `undefined` | false    | Assign focus when activated to the element matching this selector - or a specific element you supply. By default focus will be set to the first valid tab target. |
| **disableAriaHider** | `boolean`                | `false`     | false    | Disables setting `aria-hidden` on other elements inside the `document.body` while the trap is active.                                                             |

## Example

```jsx
import React from 'react'
import useFocusTrap from '@charlietango/use-focus-trap'

const Component = () => {
  const ref = useFocusTrap()
  return (
    <div ref={ref}>
      <button>Trapped to the button</button>
    </div>
  )
}

export default Component
```

### Creating a Modal

When using this hook to create a Modal, there are still a few things you need to handle, that's outside the scope of this hook:

- Trap focus
- Close on escape
- Close on backdrop clicked

#### BaseModal.tsx

This is the base component for creating a `<Modal />`. It receives an `onRequestClose` method,
that can be triggered to tell the containing component to update it's state to close the modal.
It doesn't contain a `<Backdrop />`, but that would be a absolute positioned component, that
when clicked triggers the `onRequestClose` method.

```typescript jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import useFocusTrap from '@charlietango/use-focus-trap'
import styled from 'styled-components'

type Props = {
  onRequestClose?: () => void
  children?: React.ReactNode
  isOpen: boolean
  className?: string
}

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
`

function BaseModal({ children, isOpen, onRequestClose, className }: Props) {
  const ref = useFocusTrap()

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (onRequestClose) onRequestClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }

    return
  }, [isOpen])

  const modal = (
    <Wrapper
      ref={ref}
      style={{ pointerEvents: !isOpen ? 'none' : undefined }}
      role="dialog"
      className={className}
    >
      {children}
    </Wrapper>
  )

  return ReactDOM.createPortal(modal, window.document.body)
}

BaseModal.displayName = 'BaseModal'
BaseModal.defaultProps = {}

export default BaseModal
```
