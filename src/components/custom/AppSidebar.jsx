import {
  Home,
  Clock,
  User,
  IndianRupee,
  ListCheck,
  Calendar,
  ChevronDown,
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '../ui/collapsible';
import { Link } from 'react-router-dom';
import useAuth from '@/store/useAuth';

// Menu items.
// const items = [
//   {
//     title: 'Home',
//     url: '#',
//     icon: Home,
//   },
//   {
//     title: 'Events',
//     url: '#',
//     icon: Calendar,
//   },
//   {
//     title: 'Users',
//     url: '#',
//     icon: User,
//   },
//   {
//     title: 'Registration',
//     url: '#',
//     icon: ListCheck,
//   },
//   {
//     title: 'Schedule',
//     url: '#',
//     icon: Clock,
//   },
//   {
//     title: 'Payment',
//     url: '#',
//     icon: IndianRupee,
//   },
// ];

export function AppSidebar() {
  const { setLogout } = useAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sphurti Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <HomeMenu />
              <UserMenu />
              <EventsMenu />
              <PaymentMenu />
              <RegistrationMenu />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              onClick={() => {
                setLogout();
              }}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <LogOut />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function HomeMenu() {
  return (
    <SidebarMenuItem>
      <Link to="/">
        <SidebarMenuButton asChild>
          <div className="cursor-pointer">
            <Home />
            <span>Home</span>
          </div>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}

function UserMenu() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link to="/users" className="cursor-pointer">
          <User />
          <span>Users</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function EventsMenu() {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <Calendar />
            <div className="flex justify-between w-full">
              <span>Events</span>
              <ChevronDown />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <Link to="/create-event">
                <SidebarMenuSubButton asChild>
                  <div className="cursor-pointer">
                    <span>Create Event</span>
                  </div>
                </SidebarMenuSubButton>
              </Link>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <Link to="/all-events">
                <SidebarMenuSubButton asChild>
                  <div className="cursor-pointer">
                    <span>All Events</span>
                  </div>
                </SidebarMenuSubButton>
              </Link>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function PaymentMenu() {
  return (
    <Collapsible className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <IndianRupee />
            <div className="flex justify-between w-full">
              <span>Payments</span>
              <ChevronDown />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <Link to="/all-payments">
                <SidebarMenuSubButton asChild>
                  <div className="cursor-pointer">
                    <span>All Payments</span>
                  </div>
                </SidebarMenuSubButton>
              </Link>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <Link to="/payments-by-event">
                <SidebarMenuSubButton asChild>
                  <div className="cursor-pointer">
                    <span>Payments by Events</span>
                  </div>
                </SidebarMenuSubButton>
              </Link>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function RegistrationMenu() {
  return (
    <Collapsible className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ListCheck />
            <div className="flex justify-between w-full">
              <span>Registration</span>
              <ChevronDown />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <Link to="/all-registrations">
                <SidebarMenuSubButton asChild>
                  <div className="cursor-pointer">
                    <span>All Registrations</span>
                  </div>
                </SidebarMenuSubButton>
              </Link>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <Link to="/registrations-by-event">
                <SidebarMenuSubButton asChild>
                  <div className="cursor-pointer">
                    <span>Registration by event</span>
                  </div>
                </SidebarMenuSubButton>
              </Link>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
