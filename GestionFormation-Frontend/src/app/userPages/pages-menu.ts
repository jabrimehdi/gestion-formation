import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Gérer Formations/Sessions',
    icon: 'settings-2-outline',
    children : [
      {
        title: 'Formations',
        icon: 'clipboard-outline',
        link: '/userPages/formations',
        home: true,
      },
      {
        title: 'Sessions',
        icon: 'calendar-outline',
        link: '/userPages/sessions',
        home: true,
      },
    ]
  },
  {
    title: 'Gérer Participants/Formateurs',
    icon: 'people-outline',
    children: [
      {
        title: 'Participants',
        icon: 'person-add-outline',
        link: '/userPages/participants',
      },
      {
        title: 'Formateurs',
        icon: 'plus-circle-outline',
        link: '/userPages/formateurs',
      },
    ],
  },
  
];
