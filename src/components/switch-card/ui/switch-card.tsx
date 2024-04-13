import React, { type FC, type PropsWithChildren } from 'react'

import { Label, Switch } from '@/shared/ui'

interface SwitchCardProps extends PropsWithChildren {}

export const SwitchCard: FC<SwitchCardProps> = ({ children }) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border bg-background p-4">
      <div className="space-y-0.5">
        <Label className="text-base">{children}</Label>
      </div>
      <Switch />
    </div>
  )
}
