
import React from 'react';
import { Settings, FolderOpen, CheckSquare, Gift, MapPin, Users, Wallet, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: FolderOpen, active: location.pathname === '/dashboard' },
    { name: 'Karte', href: '/map', icon: MapPin, active: location.pathname === '/map' },
    { name: 'Jobs', href: '/jobs', icon: CheckSquare, active: location.pathname === '/jobs' },
    { name: 'Profil', href: '/profile', icon: Users, active: location.pathname === '/profile' },
    { name: 'Einladen', href: '/invite', icon: Gift, active: location.pathname === '/invite' },
    { name: 'Wallet', href: '/wallet', icon: Wallet, active: location.pathname === '/wallet' },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="mr-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <img 
                src="/lovable-uploads/297ee6c8-01e0-4f29-ab9c-61eef3186daf.png" 
                alt="Mutuus" 
                className="h-10 w-auto"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                variant={item.active ? "default" : "ghost"}
                className={`flex items-center px-4 py-2 ${
                  item.active 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Button>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-gray-800 text-gray-300">
                    <Menu className="w-4 h-4 mr-2" />
                    Menü
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-48 bg-gray-800 border-gray-700">
                    <div className="p-2">
                      {navigationItems.map((item) => (
                        <NavigationMenuLink
                          key={item.name}
                          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                            item.active
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:text-white hover:bg-gray-700"
                          }`}
                          onClick={() => handleNavigation(item.href)}
                        >
                          <item.icon className="w-4 h-4 mr-2" />
                          {item.name}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* User Balance */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
              5.00€
            </div>
            <div className="bg-orange-600 text-white px-2 py-1 rounded text-sm">
              🔥 0
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
