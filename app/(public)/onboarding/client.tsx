'use client'

import type { FC } from 'react'
import { InputFloating } from '@/components/ui/input-floating'

export const OnboardingClient: FC = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <div className="w-160 px-10 max-w-full md:shadow-[0_11px_34px_0_rgba(120,120,128,0.16)] md:rounded-[30px]">
        <div className="mx-10 md:mx-20 mt-10 mb-6 flex flex-col items-center justify-center">
          <div className="size-40 bg-secondary"></div>
          <h2 className="mt-5 text-3xl text-center font-bold tracking-tight">
            Create your Organizations
          </h2>
        </div>
        <div className="mx-auto max-w-115 mb-10">
          <InputFloating placeholder="Company name" />
        </div>
      </div>
    </main>
  )
}
