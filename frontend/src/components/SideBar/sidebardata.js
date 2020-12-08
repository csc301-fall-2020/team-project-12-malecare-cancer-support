import React from 'react';

import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/matching-test',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/settings-test',
    icon: <IoIcons.IoIosSettings />,
    cName: 'nav-text'
  },
  {
    title: 'Chats',
    path: '/chats-test',
    icon: <IoIcons.IoMdChatboxes />,
    cName: 'nav-text'
  },
  {
    title: 'Contacts',
    path: '/contacts-test',
    icon: <IoIcons.IoIosPersonAdd />,
    cName: 'nav-text'
  }
];