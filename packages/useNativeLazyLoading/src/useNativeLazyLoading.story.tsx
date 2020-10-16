import React from 'react'
import useNativeLazyLoading from './useNativeLazyLoading'
import { useInView } from 'react-intersection-observer'

type Props = {
  width: number
  height: number
  src: string
}

const LazyImage = ({ width, height, src, ...rest }: Props) => {
  const supportsLazyLoading = useNativeLazyLoading()

  const [ref, inView] = useInView({
    triggerOnce: true,
    skip: supportsLazyLoading !== false,
  })

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        paddingBottom: `${(height / width) * 100}%`,
        maxWidth: width,
      }}
    >
      {inView || supportsLazyLoading ? (
        <img
          {...rest}
          src={src}
          width={width}
          height={height}
          loading="lazy"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          alt="Lazy loaded"
        />
      ) : null}
    </div>
  )
}

function Header() {
  const supportsLazyLoading = useNativeLazyLoading()
  return (
    <h2>
      Supports native loading:{' '}
      {supportsLazyLoading !== undefined
        ? supportsLazyLoading.toString()
        : '...'}
    </h2>
  )
}

const images = [
  { width: 800, height: 400 },
  { width: 800, height: 500 },
  { width: 800, height: 1000 },
  { width: 800, height: 450 },
  { width: 800, height: 800 },
  { width: 800, height: 700 },
  { width: 800, height: 550 },
  { width: 800, height: 650 },
]

export const Example = () => (
  <>
    <Header />
    <div style={{ maxWidth: 800 }}>
      {images.map((size, index) => (
        <LazyImage
          key={index.toString()}
          width={size.width}
          height={size.height}
          src={`https://placekitten.com/${size.width}/${size.height}`}
        />
      ))}
    </div>
  </>
)
