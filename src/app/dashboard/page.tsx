import React from "react";
import DefaultLayout from "@/app/dashboard/components/Layouts/DefaultLayout";
import { metadata } from "../../config/metadata";
import AppointmentStats from "./components/Dashboard/AppointmentStats";
import DashboardTable from "./components/Dashboard/DashboardTable";
import DashboardTablePatients from "./components/Dashboard/DashboardTablePatients";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
export { metadata };
export default function Dashboard() {
  return (
    <DefaultLayout>
      <AppointmentStats />
      <Box mt={{ base: 6, md: 6, "2xl": 7.5 }}>
        <Grid
          templateColumns={{ base: "1fr", xl: "repeat(2, 1fr)" }}
          gap={{ base: 4, md: 6, "2xl": 7.5 }}
        >
          <GridItem>
            <Box
              borderWidth="1px"
              borderRadius="md"
              borderColor="gray.200"
              bg="white"
              p={6}
              shadow="sm"
              _dark={{ borderColor: "gray.600", bg: "gray.800" }}
            >
              <Heading
                as="h4"
                size="md"
                mb={6}
                px={2}
                color="gray.800"
                _dark={{ color: "white" }}
              >
                Últimos usuarios registrados
              </Heading>
              <DashboardTable />
            </Box>
          </GridItem>

          <GridItem>
            <Box
              borderWidth="1px"
              borderRadius="md"
              borderColor="gray.200"
              bg="white"
              p={6}
              shadow="sm"
              _dark={{ borderColor: "gray.600", bg: "gray.800" }}
            >
              <Heading
                as="h4"
                size="md"
                mb={6}
                px={2}
                color="gray.800"
                _dark={{ color: "white" }}
              >
                Últimos pacientes registrados
              </Heading>
              <DashboardTablePatients />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </DefaultLayout>
  );
}
