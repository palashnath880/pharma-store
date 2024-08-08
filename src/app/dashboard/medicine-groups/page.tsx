"use client";
import AddMedicineGroup from "@/components/inventory/AddMedicineGroup";
import EmptyMessage from "@/components/shared/EmptyMessage";
import PageHeader from "@/components/shared/PageHeader";
import SearchForm from "@/components/shared/SearchForm";
import useSearchQuery from "@/hooks/useSearchQuery";
import type { Group } from "@/types/types";
import { Delete, KeyboardDoubleArrowRight } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

export default function Page() {
  // search params
  const searchQuery = useSearchQuery();
  const search = searchQuery.get("search") || "";
  const page = searchQuery.get("page") || "1";
  const limit = searchQuery.get("limit") || "50";

  // react-query
  const { data, isLoading, refetch, isSuccess } = useQuery<{
    count: number;
    data: Group[];
  }>({
    queryKey: ["groups", search, page, limit],
    queryFn: async () => {
      const res = await axios.get(`/api/medicine-groups`, {
        params: {
          search,
          page,
          limit,
        },
      });
      return res.data;
    },
  });

  return (
    <div className="pb-10">
      {/* page header */}
      <PageHeader
        title="Medicine Groups"
        subtitle="List of medicine groups"
        rightAction={<AddMedicineGroup refetch={refetch} />}
      />

      {/* search form */}
      <div className="mt-5">
        <SearchForm
          placeholder="Search Medicine Groups"
          value={search}
          onSearch={(value: string) => searchQuery.set({ search: value })}
        />
      </div>

      {/* loader */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <CircularProgress />
        </div>
      )}

      {/* not found */}
      {isSuccess && data?.data?.length <= 0 && (
        <EmptyMessage title="No Data Available" />
      )}

      {/* medicine groups table */}
      {isSuccess && data?.data?.length >= 0 && (
        <div className="mt-5">
          <Paper>
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Group Name</TableCell>
                    <TableCell>No of Medicines</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data?.map((group, index) => (
                    <TableRow key={group.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {moment(group.createdAt).local().format("ll")}
                      </TableCell>
                      <TableCell>{group.name}</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell className="!max-w-28">
                        <span className="flex items-center gap-3">
                          <Button
                            variant="text"
                            className="text-xs !capitalize"
                            LinkComponent={Link}
                            href={`/dashboard/medicine-groups/${group.id}`}
                            endIcon={
                              <KeyboardDoubleArrowRight fontSize="small" />
                            }
                          >
                            View Medicines
                          </Button>
                          <Tooltip title={`Delete ${group.name}`}>
                            <IconButton color="error">
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* pagination */}
            <TablePagination
              component={"div"}
              count={data?.count || 0}
              rowsPerPage={parseInt(limit)}
              page={parseInt(page) - 1}
              rowsPerPageOptions={[25, 50, 100]}
              onPageChange={(_, newPage) =>
                searchQuery.set({ page: newPage + 1 })
              }
              onRowsPerPageChange={(e) =>
                searchQuery.set({ limit: e.target.value })
              }
            />
          </Paper>
        </div>
      )}
    </div>
  );
}
