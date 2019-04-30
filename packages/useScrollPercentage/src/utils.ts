export function calculateVerticalPercentage(
  bounds: ClientRect,
  threshold: number = 0,
  root: Window | Element | null | undefined = window,
) {
  if (!root) return 0
  const vh =
    (root instanceof Element ? root.clientHeight : root.innerHeight) || 0
  const offsetTop = threshold * vh * 0.25
  const offsetBottom = threshold * vh * 0.25

  return (
    1 -
    Math.max(
      0,
      Math.min(
        1,
        (bounds.bottom - offsetTop) /
          (vh + bounds.height - offsetBottom - offsetTop),
      ),
    )
  )
}

export function calculateHorizontalPercentage(
  bounds: ClientRect,
  threshold: number = 0,
  root: Window | Element | null | undefined = window,
) {
  if (!root) return 0
  const vw = (root instanceof Element ? root.clientWidth : root.innerWidth) || 0
  const offsetLeft = threshold * vw * 0.25
  const offsetRight = threshold * vw * 0.25

  return (
    1 -
    Math.max(
      0,
      Math.min(
        1,
        (bounds.right - offsetLeft) /
          (vw + bounds.width - offsetRight - offsetLeft),
      ),
    )
  )
}
