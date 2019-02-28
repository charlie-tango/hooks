# useFocusTrap

Trap keyboard focus inside a DOM element, to prevent the user navigating outside a modal.
When using this, make sure to combine it with a fixed position `<Backdrop>` that prevents the mouse from clicking input elements.

## Installation

```sh
yarn add @charlietango/use-focus-trap
```

## API

```js
const ref = useFocusTrap(active, options)
```

## Example

```js
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

When using this inside to create a Modal, there are a few things you need to handle:

- Trap focus
- Close on escape
- Close on backdrop clicked
- Setting `aria-hidden` on root

#### BaseModal.tsx

This is the base component for creating a `<Modal />`. It receives an `onRequestClose` method,
that can be triggered to tell the containing component to update it's state to close the modal.
It doesn't contain a `<Backdrop />`, but that would be a absolute positioned component, that
when clicked triggers the `onRequestClose` method.

```typescript
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

function updateHiddenRoot(hidden: boolean) {
  // Make sure to find the actual root in your application
  const root = document.getElementById('root')
  if (hidden) {
    if (root) root.setAttribute('aria-hidden', 'true')
  } else {
    if (root) root.removeAttribute('aria-hidden')
  }
}

function BaseModal({ children, isOpen, onRequestClose, className }: Props) {
  const ref = useFocusTrap()

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (onRequestClose) onRequestClose()
    }
  }

  useEffect(() => {
    updateHiddenRoot(isOpen)
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
