'use client'

import React, { type FC } from 'react'

import NextImage, { type ImageProps as NextImageProps } from 'next/image'

import { PhotoView } from 'react-photo-view'

import { cn } from '@/shared/lib'

interface ImageProps extends NextImageProps {
  src: string
}

export const Image: FC<ImageProps> = ({ src, className, ...props }) => {
  return (
    <div className="relative">
      <NextImage
        src={src}
        className={cn('absolute bg-muted object-cover', className)}
        {...props}
      />
      <PhotoView src={src}>
        <NextImage
          src={src}
          className={cn(
            'relative cursor-zoom-in object-contain backdrop-blur',
            className
          )}
          {...props}
        />
      </PhotoView>
    </div>
  )
}
