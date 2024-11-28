"use client";
import { listarPacientesDashboard } from "@/controller/dashboard/dashboard/dashboardController";
import { listarUsuarios } from "@/controller/dashboard/dashboard/listarUsuarios";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import {
  noDataFoundComponent,
  paginationOptions,
} from "@/utils/pagination_options";
import { mostrarAlertaError } from "@/utils/show_error_alert";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { Patient, Person } from "@prisma/client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

export default function DashboardTablePatients() {
  const [patients, setpatients] = useState<Patient[]>([]);
  const [loading, setloading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setpatients(await listarPacientesDashboard());
        setloading(false);
      } catch (e: any) {
        mostrarAlertaError(e);
      }
    };
    fetchData();
  }, []);

  const columns: TableColumn<Patient>[] = [
    {
      name: "Avatar",
      cell: (row) => <Avatar src={row.photoUrl} name={row.firstName} />,
      ignoreRowClick: true,
    },
    {
      name: "Nombre",
      selector: (row) => personFullNameFormater(row),
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: (row) => row.phone ?? row.mobile ?? "No disponible",
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.email,
      sortable: true,
    },
  ];
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredPatients = patients.filter((patient) => {
    const fullName = personFullNameFormater(patient).toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });
  return loading ? (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <div>
      <div className="flex justify-start pl-8">
        <InputGroup mb={4} justifyContent="flex-end" width={200}>
          <InputLeftElement>
            <SearchIcon color="gray.400" boxSize={5} />
          </InputLeftElement>
          <Input
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={handleSearch}
            size="sm"
          />
        </InputGroup>
      </div>
      <DataTable
        columns={columns}
        data={filteredPatients}
        pagination
        highlightOnHover
        responsive
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        paginationComponentOptions={paginationOptions}
        noDataComponent={noDataFoundComponent}
        customStyles={{
          headCells: {
            style: {
              fontSize: "1rem",
              fontWeight: "bold",
              justifyContent: "center",
            },
          },
          cells: {
            style: {
              justifyContent: "center",
            },
          },
        }}
      />
    </div>
  );
}
