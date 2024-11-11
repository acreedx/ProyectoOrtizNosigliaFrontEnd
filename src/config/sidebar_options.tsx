import CitasIcon from "../app/dashboard/components/Icons/CitasIcon";
import DashboardIcon from "../app/dashboard/components/Icons/DashboardIcon";
import PacienteIcon from "../app/dashboard/components/Icons/PacienteIcon";
import UserIcon from "../app/dashboard/components/Icons/UserIcon";
import { MdMedicalServices } from "react-icons/md";
import { routes } from "./routes";

export const menuOptions = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <DashboardIcon />,
        label: "Dashboard",
        route: routes.dashboard,
        children: [
          { label: "Panel de control", route: routes.dashboard },
          { label: "Sitio Web", route: routes.sitio_web },
        ],
      },
      {
        icon: <PacienteIcon />,
        label: "Gestión de pacientes",
        route: "#",
        children: [
          { label: "Pacientes", route: routes.pacientes },
          { label: "Organizaciones", route: routes.organizaciones },
        ],
      },
      {
        icon: <CitasIcon />,
        label: "Gestión de citas",
        route: "#",
        children: [{ label: "Citas", route: routes.citas }],
      },
      {
        icon: <UserIcon />,
        label: "Gestión de usuarios",
        route: "#",
        children: [
          { label: "Usuarios", route: routes.usuarios },
          { label: "Roles", route: routes.roles },
          { label: "Eventos del sistema", route: routes.eventos_del_sistema },
        ],
      },
      {
        icon: <MdMedicalServices />,
        label: "Gestión de Tratamientos",
        route: "#",
        children: [
          { label: "Listado de tratamientos", route: routes.tratamientos },
          { label: "Tipos de tratamiento", route: routes.tipos_de_tratamiento },
        ],
      },
    ],
  },
];
