"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatDate } from "@/lib/utils";
import type { Episode } from "@/lib/types";

type Props = {
  episodes: string[];
};

const ContactEpisodes = ({ episodes }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesData, setEpisodesData] = useState<Episode[] | null>(null);
  const totalRows = 20;
  const totalPages = Math.ceil(episodes.length / totalRows);

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        const responses = await Promise.all(episodes.map((url) => fetch(url)));
        const results = await Promise.all(
          responses.map((response) => response.json())
        );
        setEpisodesData(results);
      } catch (error) {
        console.error(error);
      }
    };
    getEpisodes();
  }, []);

  const handlePaginate = (newPage: number) => {
    if (newPage > totalPages || newPage < 1) return;
    setCurrentPage(newPage);
  };

  const renderEpisodeRows = useMemo(() => {
    if (!episodesData)
      return (
        <TableBody>
          <TableRow>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton className="w-full h-24" />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      );
    return (
      <TableBody>
        {episodesData
          .slice((currentPage - 1) * totalRows, currentPage * totalRows)
          .map((episode) => (
            <TableRow key={episode.id}>
              <TableCell className="font-medium">{episode.name}</TableCell>
              <TableCell>{episode.episode}</TableCell>
              <TableCell className="text-right">
                {formatDate(episode.air_date)}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    );
  }, [episodesData, currentPage]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Episodes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Episode</TableHead>
                <TableHead className="text-right">Air Date</TableHead>
              </TableRow>
            </TableHeader>
            {renderEpisodeRows}
          </Table>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem onClick={() => handlePaginate(currentPage - 1)}>
                <PaginationPrevious />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem
                  key={index}
                  onClick={() => handlePaginate(index + 1)}
                >
                  <PaginationLink isActive={currentPage === index + 1}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem onClick={() => handlePaginate(currentPage + 1)}>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactEpisodes;
