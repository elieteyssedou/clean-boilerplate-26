'use client';

import useAutoCollapseWhenTooSmall from '@/app/_components/navigation/hooks/useAutoCollapseWhenTooSmall';
import Icon from '@/app/_design/Icon';
import useLocalStorage from '@/app/_hooks/useLocalStorage';
import {
  Button,
  Tooltip,
} from '@heroui/react';
import { SelectedTeamSwitcher, UserButton } from '@stackframe/stack';
import cx from 'classnames';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

function NavBar() {
  const {
    resolvedTheme, systemTheme, setTheme,
  } = useTheme();

  const [navBarCollapsed, setNavBarCollapsed] = useLocalStorage('navBarCollapsed', false);
  // const logoTypoSrc = (resolvedTheme === 'dark' ? '/logo_typo_dark.svg' : '/logo_typo.svg');
  const logoTypoSrc = '/GenUI-Fake-Logo.png';
  // const logoSrc = navBarCollapsed ? '/logo.svg' : logoTypoSrc;
  const logoSrc = logoTypoSrc;

  useAutoCollapseWhenTooSmall({ navBarCollapsed, setNavBarCollapsed });

  return (
    <nav className={cx('group/nav h-svh transition-all duration-300', { 'min-w-64': !navBarCollapsed, 'min-w-16': navBarCollapsed })}>
      <div className={cx('h-svh fixed flex flex-col pt-8 pb-6 overflow-hidden transition-all duration-300 border-r', {
        'w-64 px-6 bg-white/95 backdrop-blur-sm border-slate-200/60': !navBarCollapsed && resolvedTheme !== 'dark',
        'w-16 px-3 bg-white/95 backdrop-blur-sm border-slate-200/60': navBarCollapsed && resolvedTheme !== 'dark',
        'w-64 px-6 bg-slate-900/95 backdrop-blur-sm border-slate-700/60': !navBarCollapsed && resolvedTheme === 'dark',
        'w-16 px-3 bg-slate-900/95 backdrop-blur-sm border-slate-700/60': navBarCollapsed && resolvedTheme === 'dark',
      })}
      >
        <div className="flex flex-col justify-start space-y-6 flex-1">
          <div className={cx('flex items-center justify-between', {
            'flex-row ml-2 mb-8': !navBarCollapsed,
            'flex-col space-y-6 mb-6': navBarCollapsed,
          })}
          >
            <Link href="/" className="flex space-between items-center group transition-all duration-200 hover:scale-105">
              <Image
                src={logoSrc}
                alt="Logo"
                width={400}
                height={400}
                priority
                className={cx('h-auto rounded-xl shadow-soft transition-all duration-200 group-hover:shadow-soft-lg', { 'w-12': !navBarCollapsed, 'w-10': navBarCollapsed })}
              />

              {!navBarCollapsed && (
                <span className="font-semibold text-slate-800 dark:text-slate-200 ml-4 transition-colors duration-200">
                  Clean
                  <br />
                  <span className="text-slate-600 dark:text-slate-400 font-normal">Boilerplate</span>
                </span>
              )}
            </Link>

            <Tooltip
              color="default"
              content={navBarCollapsed ? 'Show navigation' : 'Hide navigation'}
              placement="right"
              className="invisible md:visible"
            >
              <Button
                isIconOnly
                variant="light"
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 invisible md:visible transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                onPress={() => { setNavBarCollapsed(!navBarCollapsed); }}
              >
                <Icon icon={navBarCollapsed ? 'chevron-double-right' : 'chevron-double-left'} size="xs" />
              </Button>
            </Tooltip>
          </div>

          <Tooltip
            color="primary"
            content="Create example resource"
            placement="right"
            isDisabled={!navBarCollapsed}
          >
            <Button
              isIconOnly={navBarCollapsed}
              variant="shadow"
              color="primary"
              className={cx('animate-fade-in font-medium transition-all duration-200 hover:scale-105 shadow-soft hover:shadow-soft-lg', { 'self-center': navBarCollapsed })}
              as={Link}
              href="/"
            >
              <Icon icon="plus" color="inherit" size="s" />
              {navBarCollapsed ? null : 'Example Resources'}
            </Button>
          </Tooltip>

          <div className="flex flex-col items-center pt-6 space-y-2 flex-1">
            {/* Example Resource Navigation will go here */}
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-full flex justify-center px-1">
            <SelectedTeamSwitcher />
          </div>

          <div className="w-full flex justify-center">
            <UserButton
              showUserInfo={!navBarCollapsed}
              colorModeToggle={() => {
                const antiTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
                setTheme(resolvedTheme === systemTheme ? antiTheme : 'system');
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
