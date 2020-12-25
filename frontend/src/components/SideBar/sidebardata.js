import React from 'react';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/landing',
    icon: <IoIcons.IoMdHome/>,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
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
    title: 'Logout',
    icon: <IoIcons.IoIosLogOut />,
    path: '/login',
    cName: 'nav-text'
  }
];