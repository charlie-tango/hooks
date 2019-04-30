# useScrollPercentage

Monitor the the amount an element is scrolled inside the viewport.
It's combined with an IntersectionObserver, so it only updates as long as the element is inside the viewport

> Checkout the [Storybook](https://ct-hooks.netlify.com/?path=/story/usescrollpercentage--readme) demo.

## Installation

```sh
yarn add @charlietango/use-scroll-percentage
```

## API

```js
const [ref, percentage] = useScrollPercentage(options, horizontal)
```

### Options

Options should match the Intersection Observer options.

| Name           | Type               | Default | Required | Description                                                                                                                                                    |
| -------------- | ------------------ | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **root**       | Element            | window  | false    | The Element that is used as the viewport for checking visibility of the target. Defaults to the browser viewport (`window`) if not specified or if null.       |
| **rootMargin** | string             | '0px'   | false    | Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left).                             |
| **threshold**  | number \| number[] | 0       | false    | Number between 0 and 1 indicating the percentage that should be visible before triggering. Can also be an array of numbers, to create multiple trigger points. |

## Example

```js
import React from 'react'
import useScrollPercentage from '@charlietango/use-scroll-percentage'

const Component = () => {
  const [ref, percentage] = useScrollPercentage()
  return <div ref={ref}>Scroll percentage: {percentage}</div>
}

export default Component
```
