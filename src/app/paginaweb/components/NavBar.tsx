"use client";
import Image from "next/image";
import React, { useState } from "react";
import useUser from "@/hooks/useUser";
import NavBarLinkChakra from "./NavBarLinkChakra";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spinner,
  Avatar,
  Text,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import { useRouter } from "next/navigation";

export default function PersoNavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const LogOut = async () => {
    await signOut({
      redirect: false,
    }).then(() => {
      router.push("/paginaweb/login");
    });
  };
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <nav className="border-b-1 sticky flex w-full flex-row justify-center">
      <ul className="m-0  mb-0 flex w-full list-none flex-wrap justify-around p-0 px-0 py-2 align-middle">
        <div className="flex items-center">
          <Link
            href="/paginaweb"
            className="text-gray-900 no-underline hover:text-orange-400"
          >
            <Image
              className="max-w-full"
              src={"/images/logo/logo.png"}
              alt="Ortiz Nosiglia Logo"
              width={60}
              height={60}
            />
          </Link>
        </div>

        <Flex as="nav" padding="1.5rem" bg="transparent" gap={10}>
          <NavBarLinkChakra linkName="Inicio" linkUrl="/" />
          <NavBarLinkChakra
            linkName="Nuestro equipo"
            linkUrl="/paginaweb/equipo"
          />
          <NavBarLinkChakra
            linkName="Reserva una cita"
            linkUrl="/paginaweb/citas"
          />
          {/*
          <NavBarLinkDropDownChakra
            linkName="Nuestro equipo"
            linkUrl="/equipo"
            subLinks={[
              { name: "Equipo Médico", url: "/equipo/medico" },
              { name: "Equipo Administrativo", url: "/equipo/administrativo" },
            ]}
          />
          */}
        </Flex>
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <Spinner />
          ) : session?.user ? (
            <>
              {session.user && (
                <li>
                  <Link
                    href="/dashboard"
                    className="rounded-xl  bg-orange-400 p-3 text-lg text-white no-underline transition-all  hover:text-orange-700 hover:drop-shadow-md "
                  >
                    Ingresar al dashboard
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={onOpen}
                  className="rounded-xl border-2 border-orange-400 p-2 text-lg text-orange-400 no-underline transition-all duration-300 hover:bg-orange-400 hover:text-white hover:drop-shadow-md focus:no-underline focus:shadow-none focus:outline-none"
                >
                  <HStack>
                    <Avatar
                      size="md"
                      name={
                        session.user.firstName + " " + session.user.familyName
                      }
                      src={session.user.photoUrl}
                    />
                    <div className="flex flex-col">
                      <Text fontWeight="bold">
                        {session.user.firstName + " " + session.user.familyName}
                      </Text>
                      <Text fontSize="sm" color="black">
                        Ver perfil
                      </Text>
                    </div>
                  </HStack>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/paginaweb/login"
                  className="rounded-xl bg-orange-400 p-2 text-lg text-white no-underline transition-all duration-300  hover:text-orange-700 hover:drop-shadow-md "
                >
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link
                  href="/paginaweb/registro"
                  className="rounded-xl border-2 border-orange-400 p-2 text-lg text-orange-400 no-underline transition-all hover:bg-orange-400 hover:text-white hover:drop-shadow-md"
                >
                  Crear Cuenta
                </Link>
              </li>
            </>
          )}
        </div>
      </ul>
      {/* Drawer para ver el perfil del usuario */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        {status === "loading" ? (
          <Spinner />
        ) : session?.user ? (
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Perfil del Usuario</DrawerHeader>
            <DrawerBody>
              <div className="mb-4 flex flex-col items-center">
                <Avatar
                  size="2xl"
                  name={session.user.username}
                  src={session.user.photoUrl}
                />
                <h2 className="mt-2 text-xl font-bold">
                  {personFullNameFormater(session.user)}
                </h2>
                <p className="text-gray-600">{session.user.rolID}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
                <Link
                  href="/paginaweb/editarperfil"
                  className="rounded-xl bg-orange-400 p-2 text-lg text-white no-underline transition-all duration-300  hover:text-orange-700 hover:drop-shadow-md "
                >
                  Cambiar contraseña
                </Link>
                <button
                  onClick={LogOut}
                  className="rounded-xl border-2 border-orange-400 p-2 text-lg text-orange-400 no-underline transition-all duration-300 hover:bg-orange-400 hover:text-white hover:drop-shadow-md focus:no-underline focus:shadow-none focus:outline-none"
                >
                  Cerrar Sesión
                </button>
              </div>
            </DrawerBody>
          </DrawerContent>
        ) : (
          <>Usuario no encontrado</>
        )}
      </Drawer>
    </nav>
  );
}
