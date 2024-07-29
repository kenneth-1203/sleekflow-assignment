"use client";

import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
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
  const [dyanmicVisiblePages, setDynamicVisiblePages] =
    useState(maxVisiblePages);
  const isTablet = useMediaQuery({ query: "(max-width: 1100px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  useEffect(() => {
    if (isMobile) {
      setDynamicVisiblePages(2);
    } else if (isTablet) {
      setDynamicVisiblePages(4);
    } else {
      setDynamicVisiblePages(maxVisiblePages);
    }
  }, [isTablet, isMobile]);

  const renderPaginationItems = useMemo(() => {
    // Sliding window technique

    const pageNumbers = [];
    const halfMaxVisiblePages = Math.floor(dyanmicVisiblePages / 3);

    let startPage = Math.max(1, currentPage - halfMaxVisiblePages);
    let endPage = Math.min(totalPages, currentPage + halfMaxVisiblePages);

    // Centering the current page within the visible page links
    // Adjust if the window is out of bounds
    if (currentPage - halfMaxVisiblePages <= 0) {
      startPage = 1;
      endPage = Math.min(totalPages, dyanmicVisiblePages);
    } else if (currentPage + halfMaxVisiblePages > totalPages) {
      startPage = Math.max(1, totalPages - dyanmicVisiblePages + 1);
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
  }, [currentPage, totalPages, dyanmicVisiblePages]);
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
