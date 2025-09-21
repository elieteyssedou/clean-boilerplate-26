import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';
import { camelCase, upperFirst } from 'lodash';

interface Props {
  icon: string;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'inherit';
  size?: 'xs' | 's' | 'm' | 'l';
  outline?: boolean;
  className?: string;
}

const sizeToTWSize = {
  xs: '3',
  s: '4',
  m: '6',
  l: '8',
};

const colorToTWColor = {
  default: 'text-gray-500',
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  inherit: 'text-inherit',
};

export default function Icon({
  icon,
  color = 'inherit',
  size = 'm',
  outline = false,
  className = '',
}: Props): JSX.Element {
  const { ...icons } = outline ? OutlineIcons : SolidIcons;

  const camelCaseIcon = upperFirst(camelCase(icon));
  const iconName = icon.endsWith('Icon') ? camelCaseIcon : `${camelCaseIcon}Icon`;
  // @ts-ignore
  const HeroIcon: JSX.Element = icons[iconName];

  if (!HeroIcon) {
    // eslint-disable-next-line no-console
    console.error(`Icon ${iconName} not found`);
    // @ts-ignore
    const QuestionMarkIcon: JSX.Element = SolidIcons.QuestionMarkCircleIcon;
    // @ts-ignore
    return <QuestionMarkIcon className="h-8 w-8 text-danger" />;
  }

  const classes = [
    `${colorToTWColor[color]}`,
    `h-${sizeToTWSize[size]}`,
    `w-${sizeToTWSize[size]}`,
    className,
  ];

  return (
    // @ts-ignore
    <HeroIcon className={classes.join(' ')} />
  );
}
