
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, UserPlus, Play, LayoutDashboard, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  authRequired?: boolean;
}

const Navbar: React.FC<{ isAuthenticated?: boolean }> = ({ isAuthenticated = false }) => {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
      authRequired: true,
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: <User className="h-4 w-4 mr-2" />,
      authRequired: true,
    },
  ];

  const authButtons = isAuthenticated ? (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline"
        onClick={() => console.log("Logout clicked")}
        className="hidden sm:flex"
      >
        Logout
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Link to="/auth?tab=login">
        <Button variant="outline" className="hidden sm:flex">
          <LogIn className="h-4 w-4 mr-2" /> Login
        </Button>
        <Button variant="outline" size="icon" className="sm:hidden">
          <LogIn className="h-4 w-4" />
        </Button>
      </Link>
      <Link to="/auth?tab=signup">
        <Button className="hidden sm:flex">
          <UserPlus className="h-4 w-4 mr-2" /> Sign Up
        </Button>
        <Button size="icon" className="sm:hidden">
          <UserPlus className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );

  return (
    <nav className="border-b bg-background sticky top-0 z-10">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link to="/" className="flex items-center mr-8">
          <span className="font-bold text-lg sm:text-xl text-interview-primary">
            Smart AI Interview Coach
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-4 flex-1">
          {navItems
            .filter(item => !item.authRequired || isAuthenticated)
            .map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-interview-accent"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          {authButtons}
          
          <Link to="/start-interview">
            <Button className="hidden sm:flex bg-interview-accent hover:bg-interview-secondary">
              <Play className="h-4 w-4 mr-2" /> Start Interview
            </Button>
            <Button size="icon" className="sm:hidden bg-interview-accent hover:bg-interview-secondary">
              <Play className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
