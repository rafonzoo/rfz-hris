'use client'

import type { FC } from 'react'
import { useDebouncer } from '@tanstack/react-pacer'
import { useRef, useState } from 'react'
import { InputFloating } from '@/components/ui/input-floating'

export const OnboardingClient: FC = () => {
  const controller = useRef<AbortController>(null)
  const [isLoading, setIsLoading] = useState(false)
  // const debounceCallback = useDebouncedCallback(
  //   async (query: string) => {
  //     //
  //     await new Promise((res) => setTimeout(res, 300))
  //   },
  //   { wait: 1_000 }
  // )
  const debouncer = useDebouncer(
    async (query: string) => {
      //
      setIsLoading(true)
      await new Promise((res) => setTimeout(res, 300))
      setIsLoading(false)
    },
    { wait: 1_000 }
  )

  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <div className="w-160 px-10 max-w-full md:shadow-[0_11px_34px_0_rgba(120,120,128,0.16)] md:rounded-[30px]">
        <div className="mx-10 md:mx-20 mt-10 mb-6 flex flex-col items-center justify-center">
          <div className="size-40 bg-secondary"></div>
          <h2 className="mt-5 text-3xl text-center font-bold tracking-tight">
            Let's set up your&nbsp;company
          </h2>
        </div>
        <div className="mx-auto max-w-115 mb-10">
          <InputFloating
            placeholder="Company name"
            autoFocus={true}
            type="email"
            autoComplete="email"
            onChange={(e) => debouncer.maybeExecute(e.target.value)}
          />
          {isLoading ? 'loading...' : 'nope'}
        </div>
      </div>
    </main>
  )
}
