export interface IRoute {
  link: string;
  key: string;
}

export interface IPathsConfig {
  home: IRoute;
  payment: IRoute;
  roadmap: IRoute;
  features: IRoute;
  how_to_use: IRoute;
  success: IRoute;
  signIn: IRoute;
  signUp: IRoute;
  logout: IRoute;
}

export const pathsConfig: IPathsConfig = {
  home: {
    key: 'home',
    link: '/',
  },

  features: {
    key: '#features',
    link: '/features',
  },

  how_to_use: {
    key: '#how-to-use',
    link: '/how-to-use',
  },

  payment: {
    key: '#pricing',
    link: '/payment',
  },

  success: {
    key: '#payment-success',
    link: '/payment-success',
  },

  roadmap: {
    key: '#roadmap',
    link: '/roadmap',
  },

  signIn: {
    key: '#signIn',
    link: '/sign-in',
  },

  signUp: {
    key: '#signUp',
    link: '/sign-up',
  },

  logout: {
    key: '#logout',
    link: '/logout',
  },
};
