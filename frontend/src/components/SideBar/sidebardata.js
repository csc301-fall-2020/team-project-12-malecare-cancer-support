import React from 'react';

import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { CurUserContext } from '../../curUserContext';

export const SidebarData = [
  {
    title: 'Home',
    path: '/matching',
    icon: <IoIcons.IoMdHome/>,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile-test',
    icon: <IoIcons.IoIosPerson />,
    cName: 'nav-text'
  },
  {
    title: 'Chats',
    path: '/chats',
    icon: <IoIcons.IoMdChatboxes />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/settings-test',
    icon: <IoIcons.IoIosSettings />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    icon: <IoIcons.IoIosLogOut />,
    path: '/login',
    cName: 'nav-text'
  }
];