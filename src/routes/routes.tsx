
import { AddMenu, EditSubmenu } from "@/components";
import AddModule from "@/components/AddModule/AddModule";
import { MenuManagment, ModuleManagment, SubmenuManagment } from "@/pages";

export interface routerType {
  title: string;
  path: string;
  element: JSX.Element;
}

const pagesData: routerType[] = [
  {
    path: "/modules",
    element: <ModuleManagment />,
    title: "modules"
  },
  {
    path: "/addmodule",
    element: <AddModule/>,
    title: "add module"
  },
  {
    path: "/menus",
    element: <MenuManagment />,
    title: "add menus"
  },
  {
    path: "/addmenu",
    element: <AddMenu />,
    title: "add menu"
  },
  {
    path: "/submenus",
    element: <SubmenuManagment />,
    title: "add submenus"
  },
  {
    path: "/editsubmenu",
    element: <EditSubmenu />,
    title: "edit submenus"
  },
];

export default pagesData;