import type { ReactNode } from 'react'

export type RC<E extends object = object> = { children?: ReactNode } & E
