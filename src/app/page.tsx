import { MainForm } from '@/features/main-form'
import { cn } from '@/shared/lib'

export default function Home() {
  return (
    <main
      className={cn(
        'relative bg-grid-black/[0.025] dark:bg-grid-white/[0.025]'
      )}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-black" />
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
    </main>
  )
}
