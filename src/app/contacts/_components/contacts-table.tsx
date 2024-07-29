"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import type { Contact } from "@/lib/types";
import DynamicPagination from "@/components/custom/dynamic-pagination";

type Props = {
  contacts: Contact[];
  totalPages: number;
  currentPage?: number;
};

const ContactsTable = ({
  contacts,
  totalPages,
  currentPage = 1,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePaginate = (op: number) => {
    const newPage = currentPage + op;
    if (newPage > totalPages || newPage < 1) return;
    router.push(`?page=${newPage}`);
  };

  const renderTableRows = useMemo(() => {
    return contacts
      .filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((contact) => (
        <TableRow key={contact.id}>
          <TableCell className="font-medium">
            <Link href={`/contacts/${contact.id}`}>{contact.name}</Link>
          </TableCell>
          <TableCell>{contact.status}</TableCell>
          <TableCell>{contact.species}</TableCell>
          <TableCell className="text-right">{contact.gender}</TableCell>
        </TableRow>
      ));
  }, [contacts, searchQuery]);

  return (
    <>
      <Input
        className="w-80"
        placeholder="Search for contacts"
        onChange={handleSearch}
      />
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Species</TableHead>
            <TableHead className="text-right">Gender</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderTableRows}</TableBody>
      </Table>
      <DynamicPagination
        currentPage={currentPage}
        maxVisiblePages={8}
        totalPages={totalPages}
        handlePaginate={handlePaginate}
      />
    </>
  );
};

export default ContactsTable;
