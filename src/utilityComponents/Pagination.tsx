import React, { useMemo } from 'react';

const Pagination = ({ totalEntries, limit, currentPage, setPage }: any) => {
  const { pages, totalPages } = useMemo(() => {
    const totalPages1 = Math.ceil(totalEntries / limit);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(currentPage + 2, totalPages1 - 2);
    const res = [];
    for (let i = startPage; i <= endPage; i += 1) {
      res.push(i);
    }
    return { pages: res, startPage, endPage, totalPages: totalPages1 };
  }, [currentPage, totalEntries, limit]);

  function pageHandler(page: any) {
    setPage(page);
  }

  return (
    <div className="flex flex-row justify-center gap-4  ">
      <button
        key={0}
        type="button"
        onClick={() => pageHandler(0)}
        className={`text-lg  ${
          currentPage !== 0
            ? 'text-lg font-medium text-lightGreen'
            : 'font-extrabold text-purple'
        }`}
      >
        {1}
      </button>
      {currentPage >= 4 && <span className="self-end text-darkGrey">...</span>}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => pageHandler(page)}
          className={`text-lg ${
            currentPage !== page
              ? 'text-lg font-medium text-lightGreen'
              : 'font-extrabold text-purple'
          }`}
        >
          {page + 1}
        </button>
      ))}
      {currentPage < totalPages - 4 && (
        <span className="self-end text-darkGrey">...</span>
      )}
      {totalPages !== 1 && (
        <button
          key={totalPages - 1}
          type="button"
          onClick={() => pageHandler(totalPages - 1)}
          className={`text-lg ${
            currentPage !== totalPages - 1
              ? 'text-lg font-medium text-lightGreen'
              : 'font-extrabold text-purple '
          }`}
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};

export default Pagination;
