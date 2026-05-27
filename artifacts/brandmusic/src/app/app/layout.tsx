import AppSidebar from '@/components/app/AppSidebar'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <main className="flex-1 lg:ml-72">
        {children}
      </main>
    </div>
  )
}
