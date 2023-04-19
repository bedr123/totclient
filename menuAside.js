import {
    mdiAccountCircle,
    mdiMonitor,
    mdiGithub,
    mdiLock,
    mdiAlertCircle,
    mdiSquareEditOutline,
    mdiTable,
    mdiViewList,
    mdiTelevisionGuide,
    mdiResponsive,
    mdiPalette,
    mdiReact,
    mdiPostageStamp
  } from "@mdi/js";
  
  export default [
    {
      to: "/admin",
      icon: mdiMonitor,
      label: "Dashboard",
    },
    {
      to: "/admin/pictures",
      label: "Pictures",
      icon: mdiPostageStamp,
    },
    {
      to: "/admin/users",
      label: "Users",
      icon: mdiAccountCircle,
    }
  ];
  