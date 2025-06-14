
import React from 'react';
import { Settings, FolderOpen, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export const DashboardHeader = () => {
  const navigationItems = [
    { name: 'Projekte', href: '#', icon: FolderOpen, active: true },
    { name: 'Aufgaben', href: '#', icon: CheckSquare, active: false },
    { name: 'Einstellungen', href: '#', icon: Settings, active: false },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">TaskManager</h2>
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
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
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
                  <NavigationMenuTrigger className="bg-gray-100">
                    Menü
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-48">
                    <div className="p-2">
                      {navigationItems.map((item) => (
                        <NavigationMenuLink
                          key={item.name}
                          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                            item.active
                              ? "bg-blue-600 text-white"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`}
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
        </div>
      </div>
    </header>
  );
};
