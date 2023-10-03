"use client";
import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

function PaginationUI() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const startPage = () => {
    if (currentPage <= 48) {
      return Math.max(currentPage - 2, 1);
    }
    if (currentPage === 50) {
      return Math.max(currentPage - 4, 1);
    }
    if (currentPage === 49) {
      return Math.max(currentPage - 3, 1);
    }
  };
  const endPage = () => {
    if (currentPage >= 3) {
      return Math.min(currentPage + 2, 50);
    }
    if (currentPage === 2) {
      return Math.min(currentPage + 3, 50);
    }
    if (currentPage === 1) {
      return Math.min(currentPage + 4, 50);
    }
  };
  const pageNumbers = [];
  for (let i = startPage(); i <= endPage(); i++) {
    pageNumbers.push(i);
  }
  const paginationButtons = pageNumbers.map((number) => (
    <Link
      style={{ PointerEvents: `${currentPage === number ? "none" : "auto"}` }}
      href={number === 1 ? pathname : `?page=${number}`}
    >
      <li
        style={{
          backgroundColor: `${currentPage === number ? "#43302b" : ""}`,
          color: `${currentPage === number ? "#fff" : ""}`,
        }}
        aria-disabled={number === 1}
        className="lg:w-10 lg:h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-md
      "
      >
        {number}
      </li>
    </Link>
  ));
  return (
    <div
      className="h-[80px] w-full flex items-center justify-center mt-5
        py-2
        "
    >
      <ul className="w-fit h-fit flex items-center bg-zinc-800 rounded-md text-red-300
      divide-solid divide-brown-600 divide-x">
        {currentPage > 1 && (
          <>
            <Link href={pathname}>
              <li className="lg:w-10 lg:h-10 sm:w-8 sm:h-8 flex items-center justify-center ">
                <i>
                  <ChevronDoubleLeftIcon className="h-4 w-4 stroke-current stroke-1" />
                </i>
              </li>
            </Link>
            <Link
              href={currentPage <= 2 ? pathname : `?page=${currentPage - 1}`}
            >
              <li className="lg:w-10 lg:h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-md">
                <i>
                  <ChevronLeftIcon className="h-4 w-4 stroke-current stroke-1" />
                </i>
              </li>
            </Link>
          </>
        )}
        {paginationButtons}
        {currentPage < 50 && (
          <>
            <Link href={`?page=${currentPage + 1}`}>
              <li className="lg:w-10 lg:h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-md">
                <i>
                  <ChevronRightIcon className="h-4 w-4 stroke-current stroke-1" />
                </i>
              </li>
            </Link>
            <Link href={`?page=50`}>
              <li className="lg:w-10 lg:h-10 sm:w-8 sm:h-8 flex items-center justify-center">
                <i>
                  <ChevronDoubleRightIcon className="h-4 w-4 stroke-current stroke-1" />
                </i>
              </li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}

export default PaginationUI;
