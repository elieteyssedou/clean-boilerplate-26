'use client';

import Icon from '@/app/_design/Icon';
import {
  Button,
  Tooltip,
} from '@heroui/react';
import cx from 'classnames';
import { usePathname, useRouter } from 'next/navigation';

export type NavBarItem = {
  key: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  exactMatch?: boolean;
};

interface Props {
  item: NavBarItem;
  navBarCollapsed: boolean;
}

function NavBarItemButton({
  item, navBarCollapsed,
}: Props): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();

  const itemMatchRoute = doesItemMatchRoute(item, pathname);

  return (
    <Tooltip
      color="foreground"
      content={(
        <div className="text-foreground-50 flex flex-col items-start justify-center truncate">
          <span className="text-small font-bold">{item.title}</span>
          <span className="text-tiny ">{item.description}</span>
        </div>
                )}
      placement="right"
      isDisabled={!navBarCollapsed}
    >
      <Button
        isIconOnly={navBarCollapsed}
        color={itemMatchRoute ? 'primary' : 'default'}
        variant={itemMatchRoute ? 'flat' : 'light'}
        className={cx({ 'w-full justify-start pl-2 h-12': !navBarCollapsed, 'text-primary': itemMatchRoute })}
        onClick={() => { router.push(item.route); }}
      >
        <div className="flex flex-row items-center space-x-2">
          <Icon icon={item.icon} outline color="inherit" />

          {(!navBarCollapsed && (
          <div className="flex flex-col items-start justify-center truncate">
            <span className="text-small font-bold">{item.title}</span>
            <span className="text-tiny ">{item.description}</span>
          </div>
          ))}
        </div>

      </Button>
    </Tooltip>
  );
}

function doesItemMatchRoute(item: NavBarItem, pathname: string) {
  return item.exactMatch
    ? pathname === item.route
    : pathname.startsWith(item.route);
}

export default NavBarItemButton;
