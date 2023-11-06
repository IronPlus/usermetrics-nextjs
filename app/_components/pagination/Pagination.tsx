import React from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = 100;
  const pagesToShow = 5;

  const startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="join">
      {pages.map((page) => (
        <button
          key={page}
          className={`join-item btn ${
            page === currentPage ? "btn-primary" : ""
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
