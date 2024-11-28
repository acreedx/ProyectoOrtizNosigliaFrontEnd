import { prisma } from "../config/prisma";
import { userStatus } from "@/enums/userStatus";
import { accountPorDefecto } from "@/utils/default_account";
import { odontogramaPorDefecto } from "@/utils/default_odontograma";
import { getPasswordExpiration } from "@/utils/get_password_expiration";
import { hashPassword } from "@/utils/password_hasher";

async function seed() {
  try {
    const permissionsData = [
      { permissionName: "Pagina Web", code: "pg_adm", active: true },
      { permissionName: "Aplicación Móvil", code: "mov_adm", active: true },
      { permissionName: "Dashboard", code: "dsh_adm", active: true },
      { permissionName: "Pacientes", code: "dsh_pct_adm", active: true },
      { permissionName: "Organizaciones", code: "dsh_org_adm", active: true },
      { permissionName: "Citas", code: "dsh_cts_adm", active: true },
      { permissionName: "Usuarios", code: "dsh_usu_adm", active: true },
      { permissionName: "Roles", code: "dsh_rol_adm", active: true },
      { permissionName: "Logs", code: "dsh_log_adm", active: true },
      { permissionName: "Tratamientos", code: "dsh_trs_adm", active: true },
      {
        permissionName: "Tipos de tratamiento",
        code: "dsh_ttrs_adm",
        active: true,
      },
    ];

    console.log("Verificando permisos existentes...");
    const existingPermissions = await prisma.permission.findMany();
    if (existingPermissions.length === 0) {
      console.log("No se encontraron permisos. Insertando...");
      await prisma.permission.createMany({
        data: permissionsData,
      });
      console.log("Permisos insertados correctamente.");
    } else {
      console.log("Los permisos ya existen.");
    }

    const permisosEncontrados = (await prisma.permission.findMany()).map(
      (permiso) => ({ id: permiso.id }),
    );

    const rolesData = [
      {
        roleName: "Dentista",
        description: "Persona encargada de tratar a los pacientes",
        active: true,
      },
      {
        roleName: "Secretario",
        description:
          "Personal encargado de administrar la información de los pacientes y citas",
        active: true,
      },
      {
        roleName: "Administrador",
        description: "Personal que administra todo en el centro",
        active: true,
      },
      {
        roleName: "Enfermero",
        description: "Ayudante del dentista y del médico temporal",
        active: true,
      },
      {
        roleName: "Médico Temporal",
        description: "Médico que trabaja temporalmente en el centro",
        active: true,
      },
    ];

    console.log("Verificando roles existentes...");
    const existingRoles = await prisma.rol.findMany();
    if (existingRoles.length === 0) {
      console.log("No se encontraron roles. Insertando...");
      await Promise.all(
        rolesData.map(async (role) => {
          await prisma.rol.create({
            data: {
              ...role,
              permissions: {
                connect: permisosEncontrados,
              },
            },
          });
        }),
      );
      console.log("Roles insertados correctamente.");
      if ((await prisma.organization.findMany()).length === 0) {
        await prisma.organization.create({
          data: {
            name: "Seguros La Nueva Vida S.A.",
            address: "Calle 10, Zona Sur",
          },
        });
        console.log("Organización inicial creada.");
      }

      // **Paso 2: Crear usuarios iniciales**
      const usuarios = await prisma.person.findMany();
      if (usuarios.length === 0) {
        // Verificar roles iniciales
        const administradorRole = await prisma.rol.findUnique({
          where: { roleName: "Administrador" },
        });

        if (!administradorRole) {
          throw new Error("Rol de Administrador no encontrado");
        }

        const dentistaRole = await prisma.rol.findUnique({
          where: { roleName: "Dentista" },
        });

        if (!dentistaRole) {
          throw new Error("Rol de Dentista no encontrado");
        }

        // Crear Administrador
        const initialAdministrador = await prisma.person.create({
          data: {
            photoUrl:
              "https://media.istockphoto.com/id/1371009338/photo/portrait-of-confident-a-young-dentist-working-in-his-consulting-room.jpg?s=612x612&w=0&k=20&c=I212vN7lPpAOwGKRoEY9kYWunJaMj9vH2g-8YBGc2MI=",
            firstName: "Jaime",
            secondName: "Adrian",
            familyName: "Herrera",
            gender: "masculino",
            birthDate: new Date("2003-06-05"),
            phone: "2285515",
            mobile: "73744202",
            email: "adrianhlinares@gmail.com",
            addressLine: "Calle Francisco Katari #1338",
            addressCity: "La Paz",
            maritalStatus: "soltero",
            identification: "13679995",
            user: {
              create: {
                username: "AdrianHerrera",
                password: await hashPassword("1234Aa@"),
                passwordExpiration: getPasswordExpiration(),
                status: userStatus.ACTIVO,
              },
            },
            rol: {
              connect: { id: administradorRole.id },
            },
          },
        });

        // Crear Dentistas
        const dentists = [
          {
            firstName: "Fernando",
            familyName: "Ortiz Nosiglia",
            identification: "13679988",
            username: "DentistaFernando",
            photoUrl:
              "https://firebasestorage.googleapis.com/v0/b/proyectoortiznosiglia.appspot.com/o/fotosDePerfil%2FFernando.png?alt=media&token=1eebe1de-72c7-4bf6-9337-861582e05593",
          },
          {
            firstName: "Álvaro",
            familyName: "Ortiz Nosiglia",
            identification: "13679989",
            username: "DentistaAlvaro",
            photoUrl:
              "https://firebasestorage.googleapis.com/v0/b/proyectoortiznosiglia.appspot.com/o/fotosDePerfil%2FAlvaro.png?alt=media&token=f9d131c2-b5d5-4cf5-8efe-7a96cb5e99ea",
          },
          {
            firstName: "Javier",
            familyName: "Ortiz Nosiglia",
            identification: "13679990",
            username: "DentistaJavier",
            photoUrl:
              "https://firebasestorage.googleapis.com/v0/b/proyectoortiznosiglia.appspot.com/o/fotosDePerfil%2FJavier.png?alt=media&token=451730fa-b8ab-453d-8d7a-929dfad026e0",
          },
        ];

        for (const dentist of dentists) {
          await prisma.person.create({
            data: {
              photoUrl: dentist.photoUrl,
              firstName: dentist.firstName,
              familyName: dentist.familyName,
              gender: "masculino",
              birthDate: new Date("2003-06-05"),
              email: "adrianhlinares@gmail.com",
              addressLine: "Calle Francisco Katari #1338",
              addressCity: "La Paz",
              maritalStatus: "soltero",
              identification: dentist.identification,
              phone: "2285515",
              mobile: "73744202",
              qualifications: {
                create: [
                  {
                    start: new Date("2003-08-19"),
                    end: new Date("2007-08-19"),
                    name: "Odontólogo",
                    issuer: "Universidad Internacional de Los Andes",
                  },
                ],
              },
              user: {
                create: {
                  username: dentist.username,
                  password: await hashPassword("1234Aa@"),
                  passwordExpiration: getPasswordExpiration(),
                  status: userStatus.ACTIVO,
                },
              },
              rol: {
                connect: { id: dentistaRole.id },
              },
            },
          });
        }

        // Crear Paciente Inicial
        const initialPatient = await prisma.patient.create({
          data: {
            photoUrl: "https://cdn-icons-png.flaticon.com/512/1430/1430453.png",
            firstName: "Juan",
            secondName: "Pablo",
            familyName: "Mendoza Fernandez",
            gender: "masculino",
            birthDate: new Date("2003-06-05"),
            email: "adrianhlinares@gmail.com",
            addressLine: "Calle Francisco Katari #1338",
            addressCity: "La Paz",
            maritalStatus: "soltero",
            identification: "13679997",
            phone: "2285515",
            mobile: "73744202",
            account: {
              create: accountPorDefecto,
            },
            user: {
              create: {
                username: "PacienteInicial",
                password: await hashPassword("1234Aa@"),
                passwordExpiration: getPasswordExpiration(),
                status: userStatus.ACTIVO,
              },
            },
            odontograma: {
              create: odontogramaPorDefecto,
            },
          },
        });

        console.log("Usuarios creados correctamente.", {
          initialAdministrador,
          dentists,
          initialPatient,
        });
      }
    } else {
      console.log("Los roles ya existen.");
    }
  } catch (error) {
    console.error("Error al inicializar los datos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
