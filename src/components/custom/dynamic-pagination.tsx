"use client";

import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type Props = {
  maxVisiblePages: number;
  currentPage: number;
  totalPages: number;
  handlePaginate: (op: number) => void;
};

const DynamicPagination = ({
  maxVisiblePages,
  currentPage,
  totalPages,
  handlePaginate,
}: Props) => {
  const renderPaginationItems = useMemo(() => {
    // Sliding window technique

    const pageNumbers = [];
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 3);

    let startPage = Math.max(1, currentPage - halfMaxVisiblePages);
    let endPage = Math.min(totalPages, currentPage + halfMaxVisiblePages);

    // Centering the current page within the visible page links
    // Adjust if the window is out of bounds
    if (currentPage - halfMaxVisiblePages <= 0) {
      startPage = 1;
      endPage = Math.min(totalPages, maxVisiblePages);
    } else if (currentPage + halfMaxVisiblePages > totalPages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      endPage = totalPages;
    }

    // Add the first page
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push(-1);
      }
    }

    // Add the range of pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add the last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(-1);
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, index) => {
      if (number < 1) {
        return (
          <PaginationItem key={index}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      } else {
        return (
          <PaginationItem key={index}>
            <PaginationLink
              href={`?page=${number}`}
              isActive={currentPage === number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        );
      }
    });
  }, [currentPage, totalPages, maxVisiblePages]);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className="cursor-pointer"
          onClick={() => handlePaginate(-1)}
        >
          <PaginationPrevious />
        </PaginationItem>
        {renderPaginationItems}
        <PaginationItem
          className="cursor-pointer"
          onClick={() => handlePaginate(1)}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DynamicPagination;
