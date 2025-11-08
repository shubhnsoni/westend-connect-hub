import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col w-full">
          <header className="h-16 border-b flex items-center px-4 bg-background sticky top-0 z-10">
            <SidebarTrigger className="lg:hidden" />
            <div className="hidden lg:block">
              <SidebarTrigger />
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
