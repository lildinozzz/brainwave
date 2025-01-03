import { pathsConfig } from '@config';

type TNavigation = {
  id: string;
  title: string;
  url: string;
  onlyMobile?: boolean;
};

export const navigation: TNavigation[] = [
  {
    id: '1',
    title: 'Features',
    url: pathsConfig.features.key,
  },
  {
    id: '2',
    title: 'Pricing',
    url: pathsConfig.payment.key,
  },
  {
    id: '3',
    title: 'How to use',
    url: pathsConfig.how_to_use.key,
  },
  {
    id: '4',
    title: 'Roadmap',
    url: pathsConfig.roadmap.key,
  },
  {
    id: '5',
    title: 'New account',
    url: pathsConfig.signUp.key,
    onlyMobile: true,
  },
  {
    id: '6',
    title: 'Sign in',
    url: pathsConfig.signIn.key,
    onlyMobile: true,
  },
  {
    id: '7',
    title: 'Logout',
    url: pathsConfig.logout.key,
    onlyMobile: true,
  },
];
