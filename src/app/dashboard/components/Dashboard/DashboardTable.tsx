"use client";
import { listarUsuarios } from "@/serveractions/dashboard/dashboardpage/listarUsuarios";
import { personFullNameFormater } from "@/utils/format_person_full_name";
import {
  noDataFoundComponent,
  paginationOptions,
} from "@/utils/pagination_options";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { Person } from "@prisma/client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Swal from "sweetalert2";

export default function DashboardTable() {
  const [persons, setpersons] = useState<Person[]>([]);
  const [loading, setloading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setpersons(await listarUsuarios());
        setloading(false);
      } catch (e) {
        Swal.fire("Error");
      }
    };
    fetchData();
  }, []);

  const columns: TableColumn<Person>[] = [
    {
      name: "Avatar",
      cell: (row) => <Avatar src={row.photoUrl} name={row.username} />,
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
  const filteredPersons = persons.filter((person) => {
    const fullName = personFullNameFormater(person).toLowerCase();
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
        data={filteredPersons}
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
