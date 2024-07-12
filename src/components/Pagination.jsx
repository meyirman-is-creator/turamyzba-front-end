import React from 'react';

const Pagination = ({ total, limit, page, setPage }) => {
  const totalPages = Math.ceil(total / limit);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className="px-2 py-1 m-1 bg-gray-300 rounded"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        &lt;
      </button>
      {pages.map((pg) => (
        <button
          key={pg}
          className={`px-2 py-1 m-1 ${pg === page ? 'bg-yellow-400' : 'bg-gray-300'} rounded`}
          onClick={() => setPage(pg)}
        >
          {pg}
        </button>
      ))}
      <button
        className="px-2 py-1 m-1 bg-gray-300 rounded"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
