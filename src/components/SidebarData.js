import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },
    {
        title: "Admin",
        path: "/admin",
        icon: < MdIcons.MdOutlineAdminPanelSettings />,
        cName: "nav-text"
    },
    {
        title: "Account",
        path: "/account",
        icon: <MdIcons.MdOutlineAccountCircle />,
        cName: "nav-text"
    },
    {
        title: "Adverts",
        path: "/ads",
        icon: <RiIcons.RiAdvertisementLine />,
        cName: "nav-text"
    },
    {
        title: "Logout",
        path: "/logout",
        icon: <RiIcons.RiLogoutBoxLine />,
        cName: "nav-text"
    }
]