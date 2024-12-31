export interface IRoute {
  link: string;
  key: string;
}

export interface IPathsConfig {
  home: IRoute;
  pricing: IRoute;
  roadmap: IRoute;
  features: IRoute;
  how_to_use: IRoute;
  signIn: IRoute;
  signUp: IRoute;
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

  pricing: {
    key: '#pricing',
    link: '/pricing',
  },

  roadmap: {
    key: '#roadmap',
    link: '/roadmap',
  },

  signIn: {
    key: 'signIn',
    link: '/signIn',
  },

  signUp: {
    key: 'signUp',
    link: '/signUp',
  },
};
