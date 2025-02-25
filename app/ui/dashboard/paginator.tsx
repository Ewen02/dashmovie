"use client";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChangeAction: (page: number) => void;
}

export function Paginator({
  currentPage,
  totalPages,
  onPageChangeAction,
}: PaginatorProps) {
  const pagesToShow: number[] = [];
  for (let i = currentPage; i < currentPage + 3 && i <= totalPages; i++) {
    pagesToShow.push(i);
  }
  if (!pagesToShow.includes(totalPages)) {
    pagesToShow.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center w-full space-x-2">
      <button
        onClick={() => onPageChangeAction(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
      >
        &laquo;
      </button>
      <button
        onClick={() => onPageChangeAction(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
      >
        &lsaquo;
      </button>
      {pagesToShow.map((page) => (
        <button
          key={page}
          onClick={() => onPageChangeAction(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChangeAction(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
      >
        &rsaquo;
      </button>
      <button
        onClick={() => onPageChangeAction(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
      >
        &raquo;
      </button>
    </div>
  );
}
