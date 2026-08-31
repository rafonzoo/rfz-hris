import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

function InputFloating({
  className,
  placeholder = 'Label',
  readOnly,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <div className="relative" inert={readOnly}>
      <Input
        {...props}
        placeholder={placeholder}
        className={cn(
          'pt-4.5 pb-0 px-4 h-14 peer md:text-base placeholder:text-transparent file:h-9',
          className
        )}
      />
      <span className="absolute peer-disabled:opacity-50 left-4 text-muted-foreground pointer-events-none transition-all text-[12px] peer-placeholder-shown:top-4 peer-placeholder-shown:text-base  top-2 peer-focus:text-[12px] peer-focus:top-2">
        {placeholder}
      </span>
    </div>
  )
}

export { InputFloating }
