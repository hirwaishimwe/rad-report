import React from "react";

function Pagination({
  activePage,
  count,
  rowsPerPage,
  totalPages,
  setActivePage,
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = page => {
    setActivePage(page);
  };

  return (
    <nav className="mt-4 border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="w-0 flex-1 flex">
        <button
          onClick={() => handlePageChange(activePage - 1)}
          disabled={activePage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
      </div>
      <div className="hidden md:flex">
        <span className="relative z-0 inline-flex shadow-sm rounded-md">
          {pages.map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                activePage === page
                  ? "text-indigo-500 bg-indigo-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
        </span>
      </div>
      <div className="w-0 flex-1 flex justify-end">
        <button
          onClick={() => handlePageChange(activePage + 1)}
          disabled={activePage === totalPages}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </nav>
  );
}

export { Pagination };
