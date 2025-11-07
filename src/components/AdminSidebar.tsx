import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  MessageSquare,
  Mail,
  Image,
  Settings,
  FileDown,
  Bell,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';

const menuItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard, end: true },
  { title: 'Blog Posts', url: '/admin/blog', icon: FileText },
  { title: 'Events', url: '/admin/events', icon: Calendar },
  { title: 'Meetings', url: '/admin/meetings', icon: Users },
  { title: 'Resources', url: '/admin/resources', icon: FileDown },
  { title: 'Announcements', url: '/admin/announcements', icon: Bell },
  { title: 'Feedback', url: '/admin/feedback', icon: MessageSquare },
  { title: 'Newsletter', url: '/admin/newsletter', icon: Mail },
  { title: 'Media Library', url: '/admin/media', icon: Image },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const { signOut, user } = useAuth();

  const isActive = (path: string, end?: boolean) => {
    if (end) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={open ? 'w-64' : 'w-16'} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2">
            {open ? 'WECA Admin' : 'WA'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url, item.end)}>
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        {open && user && (
          <div className="px-4 py-2 text-sm text-muted-foreground border-t">
            <p className="truncate">{user.email}</p>
          </div>
        )}
        <div className="p-2">
          <Button
            variant="ghost"
            size={open ? 'default' : 'icon'}
            className="w-full justify-start"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            {open && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
