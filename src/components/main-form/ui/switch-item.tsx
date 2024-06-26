import React, { type HTMLProps, forwardRef } from 'react'

import { FormControl, FormItem, FormLabel, Switch } from '@/components/ui'
import { cn } from '@/shared/lib'

type FieldProps = Omit<HTMLProps<HTMLDivElement>, 'value'> & {
  value: boolean
  onChange: (checked: boolean) => void
}

export const SwitchItem = forwardRef<HTMLDivElement, FieldProps>(
  ({ className, value, onChange, children, ...props }, ref) => {
    return (
      <FormItem ref={ref} {...props}>
        <FormLabel
          className={cn(
            'text-sm font-normal',
            'flex flex-row items-center justify-between',
            'cursor-pointer',
            'px-5 py-4',
            className
          )}
        >
          {children}
          <FormControl>
            <Switch checked={value} onCheckedChange={onChange} />
          </FormControl>
        </FormLabel>
      </FormItem>
    )
  }
)
SwitchItem.displayName = 'SwitchItem'
