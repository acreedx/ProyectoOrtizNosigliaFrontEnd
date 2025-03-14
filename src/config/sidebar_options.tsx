import CitasIcon from "../app/dashboard/components/Icons/CitasIcon";
import DashboardIcon from "../app/dashboard/components/Icons/DashboardIcon";
import PacienteIcon from "../app/dashboard/components/Icons/PacienteIcon";
import UserIcon from "../app/dashboard/components/Icons/UserIcon";
import {
  MdMedicalServices,
  MdMoney,
  MdPanTool,
  MdSettings,
} from "react-icons/md";
import { routes } from "./routes";
import { permissionsList } from "@/enums/permissionsList";

export const menuOptions = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <DashboardIcon />,
        label: "Dashboard",
        route: routes.dashboard,
        children: [
          {
            label: "Panel de control",
            route: routes.dashboard,
            permission: permissionsList.DASHBOARD,
          },
          {
            label: "Sitio Web",
            route: routes.sitio_web,
            permission: permissionsList.SIN_PERMISO,
          },
        ],
      },
      {
        icon: <PacienteIcon />,
        label: "Gestión de pacientes",
        route: "#",
        children: [
          {
            label: "Pacientes",
            route: routes.pacientes,
            permission: permissionsList.PACIENTES,
          },
          {
            label: "Organizaciones",
            route: routes.organizaciones,
            permission: permissionsList.ORGANIZACIONES,
          },
          {
            label: "Reportes",
            route: routes.reportepacientes,
            permission: permissionsList.PACIENTES,
          },
        ],
      },
      {
        icon: <CitasIcon />,
        label: "Gestión de citas",
        route: "#",
        children: [
          {
            label: "Citas",
            route: routes.citas,
            permission: permissionsList.CITAS,
          },
          {
            label: "Reportes",
            route: routes.reportecitas,
            permission: permissionsList.CITAS,
          },
        ],
      },
      {
        icon: <UserIcon />,
        label: "Gestión de usuarios",
        route: "#",
        children: [
          {
            label: "Usuarios",
            route: routes.usuarios,
            permission: permissionsList.USUARIOS,
          },
          {
            label: "Roles",
            route: routes.roles,
            permission: permissionsList.ROLES,
          },
          {
            label: "Eventos del sistema",
            route: routes.eventos_del_sistema,
            permission: permissionsList.LOGS,
          },
          {
            label: "Reportes",
            route: routes.reporteusuarios,
            permission: permissionsList.USUARIOS,
          },
        ],
      },
      {
        icon: <MdMedicalServices />,
        label: "Gestión de Tratamientos",
        route: "#",
        children: [
          {
            label: "Listado de tratamientos",
            route: routes.tratamientos,
            permission: permissionsList.TRATAMIENTOS,
          },
          {
            label: "Tipos de tratamiento",
            route: routes.tipos_de_tratamiento,
            permission: permissionsList.TIPOS_TRATAMIENTO,
          },
          {
            label: "Reportes",
            route: routes.reportestratamiento,
            permission: permissionsList.TRATAMIENTOS,
          },
        ],
      },
      {
        icon: <MdMoney />,
        label: "Gestión de Deudas",
        route: "#",
        children: [
          {
            label: "Panel de deudas",
            route: routes.deudas,
            permission: permissionsList.TRATAMIENTOS,
          },
        ],
      },
      {
        icon: <MdSettings />,
        label: "Configuración",
        route: "#",
        children: [
          {
            label: "Importar Datos",
            route: routes.configurarimportardatos,
            permission: permissionsList.TRATAMIENTOS,
          },
        ],
      },
    ],
  },
];
