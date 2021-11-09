import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Utilisateurs',
    icon: 'people-outline',
    link: '/pages/utilisateur',
    home: true,
  },
  {
    title: 'Gérer le paramétrage',
    icon: 'settings-outline',
    children: [
      {
        title: 'Gérer les structures/organismes',
        link: '/pages/structures',
      },
      {
        title: 'Gérer les profils',
        link: '/pages/profils',
      },
      {
        title: 'Gérer les pays',
        link: '/pages/pays',
      },
      {
        title: 'Gérer les domaines',
        link: '/pages/domaines',
      },
    ],
  },
  
];
