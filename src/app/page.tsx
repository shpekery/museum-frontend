import { MainForm } from '@/features/main-form'
import { cn } from '@/shared/lib'

export default function Page() {
  return (
    <div
      className={cn(
        'container',
        'py-32',
        'flex flex-col items-center justify-center',
        'gap-6',
        'min-h-screen w-full'
      )}
    >
      <h1 className="text-center">Поиск музейных предметов</h1>
      <p className="lead text-center">
        Загрузите изображение для классификации, автоматического создания
        описания и поиска похожих изображений
      </p>
      <MainForm />
    </div>
  )
}
