"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { NavLink } from "react-router-dom";
import { MovieType } from "./MovieList";
import InfoIcon from "@mui/icons-material/Info";

interface Props {
  data: MovieType[];
}

export const MovieTable: React.FC<Props> = ({ data }) => {
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("DD.MM.YYYY");
  };

  const getVoteCountStyle = (rating: number) => {
    if (rating < 4) {
      return { backgroundColor: "#b22a00" };
    } else if (rating >= 4 && rating < 8) {
      return { backgroundColor: "#ffc400" };
    } else {
      return { backgroundColor: "#618833" };
    }
  };

  const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
    {
      accessorKey: "title",
      header: "Title",
      filterVariant: "text",
      size: 250,
    },

    {
      accessorKey: "vote_average",
      header: "Rating",
      size: 50,
      Cell: ({ row }) => (
        <Box
          sx={{
            ...getVoteCountStyle(row.original.vote_average),
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            color: "white",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "15px" }}>
            {row.original.vote_average.toFixed(0)}
          </p>
        </Box>
      ),
    },
    {
      accessorKey: "formatted_release_date",
      header: "Release Date",
      size: 50,
      Cell: ({ row }) => <p>{formatDate(row.original.release_date)}</p>,
    },
    {
      accessorKey: "vote_count",
      header: "Votes",
      filterVariant: "text",
      size: 50,
    },
    {
      accessorKey: "id",
      header: "",
      size: 30,
      enableSorting: false,
      Cell: ({ row }) => (
        <NavLink
          to={`/movie/${row.original.id}`}
          style={{
            color: "black",
            textDecoration: "none",
          }}
        >
          <InfoIcon />
        </NavLink>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: false,
    manualPagination: true,
    enableGlobalFilter: true,
    enableColumnFilters: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    muiTableBodyRowProps: () => ({
      sx: {
        backgroundColor: "rgba(250, 244, 211,.1)",
      },
    }),
  });

  return (
    <Box sx={{ marginTop: "10px " }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};
