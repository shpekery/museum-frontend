'use client'

import React, { type FC, useState } from 'react'

import NextImage, { type ImageProps as NextImageProps } from 'next/image'

import FsLightbox from 'fslightbox-react'

import { cn } from '@/shared/lib'

interface ImageProps extends NextImageProps {
  sources?: string[]
  slide?: number
  src: string
}

export const Image: FC<ImageProps> = ({
  slide,
  sources,
  className,
  ...props
}) => {
  const [toggler, setToggler] = useState(false)

  return (
    <>
      <FsLightbox
        slide={slide}
        toggler={toggler}
        sources={sources || [props.src]}
      />
      <NextImage
        onClick={() => setToggler(!toggler)}
        className={cn('cursor-pointer', className)}
        {...props}
      />
    </>
  )
}
