'use client';

import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Mobile Navigation */}
        <MobileNav />
        
        {/* Desktop Title - Hidden on mobile */}
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-gray-900">Sistem Informasi RT/RW</h1>
        </div>

        {/* Mobile Title */}
        <div className="md:hidden flex-1 text-center">
          <h1 className="text-lg font-semibold text-gray-900">SI RT/RW</h1>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin RT</p>
              <p className="text-xs text-gray-500">RT 001 RW 005</p>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm">👤</span>
            </div>
          </div>
          
          {/* Mobile user icon only */}
          <div className="sm:hidden">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm">👤</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}