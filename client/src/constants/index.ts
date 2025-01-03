import { pathsConfig } from '@config';
import { TPayment } from 'src/types/chat.types';

type TNavigation = {
  id: string;
  title: string;
  url: string;
  onlyMobile?: boolean;
};

export const navigation: TNavigation[] = [
  {
    id: '0',
    title: 'Features',
    url: pathsConfig.features.key,
  },
  {
    id: '1',
    title: 'Pricing',
    url: pathsConfig.payment.key,
  },
  {
    id: '2',
    title: 'How to use',
    url: pathsConfig.how_to_use.key,
  },
  {
    id: '3',
    title: 'Roadmap',
    url: pathsConfig.roadmap.key,
  },
  {
    id: '4',
    title: 'New account',
    url: pathsConfig.signUp.key,
    onlyMobile: true,
  },
  {
    id: '5',
    title: 'Sign in',
    url: pathsConfig.signIn.key,
    onlyMobile: true,
  },
  {
    id: '6',
    title: 'Logout',
    url: pathsConfig.logout.key,
    onlyMobile: true,
  },
];

export const pricing: TPayment[] = [
  {
    id: '1',
    title: 'Basic',
    description: 'AI chatbot, personalized recommendations',
    price: '0',
    features: [
      'An AI chatbot that can understand your queries',
      'Personalized recommendations based on your preferences',
      'Ability to explore the app and its features without any cost',
      'Basic email support for any questions or concerns',
      'Access to a limited set of FAQ responses to quickly solve common issues',
    ],
  },
  {
    id: '2',
    title: 'Premium',
    description: 'Advanced AI chatbot, priority support, analytics dashboard',
    price: '9.99',
    features: [
      'An advanced AI chatbot that can understand complex queries',
      'An analytics dashboard to track your conversations',
      'Priority support to solve issues quickly',
      'Access to a growing library of exclusive AI tools',
      'Ability to schedule chatbot responses for specific times',
    ],
  },
  {
    id: '3',
    title: 'Enterprise',
    description: 'Custom AI chatbot, advanced analytics, dedicated account',
    price: '29.99',
    features: [
      'Personalized recommendations based on your preferences',
      '24/7 customer support with a dedicated account manager',
      'Integration with third-party business tools and APIs',
      'Advanced AI that adapts and improves with every interaction',
      'Dedicated server for faster and more secure processing',
    ],
  },
];
