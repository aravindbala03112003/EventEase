'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/Button';
import { useAuth } from '../features/auth/useAuth';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = Boolean(user);
  const isAdmin = user?.role === 'admin';

  return (
    <nav className='sticky top-0 z-50 bg-white border-b border-slate-200 shadow-soft'>
      <div className='container max-w-6xl mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2 font-bold text-xl'>
            <div className='w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg'></div>
            <span className='text-gradient'>EventEase</span>
          </Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-6'>
            <Link
              href='/rooms'
              className='text-slate-700 hover:text-primary-600 transition-colors font-medium'
            >
              Rooms
            </Link>
            <Link
              href='/rooms/calendar'
              className='text-slate-700 hover:text-primary-600 transition-colors font-medium'
            >
              Calendar
            </Link>
            <Link
              href='/bookings'
              className='text-slate-700 hover:text-primary-600 transition-colors font-medium'
            >
              Bookings
            </Link>
            <Link href='/dashboard' className='text-slate-700 hover:text-primary-600 transition-colors font-medium'>
              Dashboard
            </Link>
            <Link
              href={isAdmin ? '/admin/dashboard' : '/login'}
              className='text-slate-700 hover:text-primary-600 transition-colors font-medium'
            >
              Admin
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className='hidden md:flex items-center gap-3'>
            {isLoggedIn ? (
              <>
                <Link href='/bookings/new'>
                  <Button size='sm'>
                    Book Room
                  </Button>
                </Link>
                {isAdmin && (
                  <Link href='/admin/dashboard'>
                    <Button variant='secondary' size='sm'>
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                <Button variant='outline' size='sm' onClick={logout}>
                  {isAdmin ? 'Logout (Admin)' : 'Logout'}
                </Button>
              </>
            ) : (
              <>
                <Link href='/login'>
                  <Button variant='outline' size='sm'>
                    Sign In
                  </Button>
                </Link>
                <Link href='/admin/login'>
                  <Button variant='outline' size='sm'>
                    Admin Sign In
                  </Button>
                </Link>
                <Link href='/admin/signup'>
                  <Button variant='ghost' size='sm'>
                    Admin Sign Up
                  </Button>
                </Link>
                <Link href='/bookings/new'>
                  <Button size='sm'>
                    Book Room
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden pb-4 border-t border-slate-200 space-y-2 animate-slide-in'>
            <Link
              href='/rooms'
              className='block px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg'
              onClick={() => setIsMenuOpen(false)}
            >
              Rooms
            </Link>
            <Link
              href='/rooms/calendar'
              className='block px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg'
              onClick={() => setIsMenuOpen(false)}
            >
              Calendar
            </Link>
            <Link
              href='/bookings'
              className='block px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg'
              onClick={() => setIsMenuOpen(false)}
            >
              Bookings
            </Link>
            <Link
              href='/dashboard'
              className='block px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg'
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href={isAdmin ? '/admin/dashboard' : '/login'}
              className='block px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg'
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            <div className='px-4 py-2 space-y-2'>
              {isLoggedIn ? (
                <>
                  <Link href='/bookings/new' onClick={() => setIsMenuOpen(false)}>
                    <Button fullWidth>
                      Book Room
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link href='/admin/dashboard' onClick={() => setIsMenuOpen(false)}>
                      <Button variant='secondary' fullWidth>
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button variant='outline' fullWidth onClick={() => { logout(); setIsMenuOpen(false); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href='/login' onClick={() => setIsMenuOpen(false)}>
                    <Button variant='outline' fullWidth>
                      Sign In
                    </Button>
                  </Link>
                  <Link href='/admin/login' onClick={() => setIsMenuOpen(false)}>
                    <Button variant='outline' fullWidth>
                      Admin Sign In
                    </Button>
                  </Link>
                  <Link href='/admin/signup' onClick={() => setIsMenuOpen(false)}>
                    <Button variant='ghost' fullWidth>
                      Admin Sign Up
                    </Button>
                  </Link>
                  <Link href='/signup' onClick={() => setIsMenuOpen(false)}>
                    <Button variant='ghost' fullWidth>
                      Sign Up
                    </Button>
                  </Link>
                  <Link href='/bookings/new' onClick={() => setIsMenuOpen(false)}>
                    <Button fullWidth>
                      Book Room
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
