import React from "react";
import nextIcon from "../assets/nextIcon.svg";
import prevIcon from "../assets/prevIcon.svg";

const Pagination = ({ total, limit, page, setPage }) => {
  const totalPages = Math.ceil(total / limit);
  const getPages = () => {
    let pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages = [1, 2, 3, 4, 5];
      } else if (page >= totalPages - 2) {
        pages = [
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [page - 2, page - 1, page, page + 1, page + 2];
      }
    }

    return pages;
  };

  const pages = getPages();

  return (
    <>
      {totalPages !== 1 && (
        <div className="flex justify-center items-center mt-[30px] gap-[10px] mb-[50px]">
          {page !== 1 && (
            <button
              className="w-[50px] h-[50px] flex items-center justify-center rounded-[5px] border-[1px] border-black"
              onClick={() => setPage(page - 1)}
            >
              <img
                src={prevIcon}
                alt=""
                className="max-w-[35px] max-h-[35px]"
              />
            </button>
          )}

          {pages[0] !== 1 && (
            <button
              className={`w-[50px] font-semibold text-[30px] h-[50px] flex items-center justify-center rounded-[5px] ${
                1 === page
                  ? "bg-[#565656] text-[#FFE500]"
                  : "border-[1px] border-black"
              }`}
              onClick={() => setPage(1)}
            >
              1
            </button>
          )}

          {pages[0] > 2 && <span>...</span>}

          {pages.map((pg) => (
            <button
              key={pg}
              className={`w-[50px] font-semibold text-[30px] h-[50px] flex items-center justify-center rounded-[5px] ${
                pg === page
                  ? "bg-[#565656] text-[#FFE500]"
                  : "border-[1px] border-black"
              }`}
              onClick={() => setPage(pg)}
            >
              {pg}
            </button>
          ))}

          {pages[pages.length - 1] < totalPages - 1 && <span>...</span>}

          {pages[pages.length - 1] !== totalPages && (
            <button
              className={`w-[50px] font-semibold text-[30px] h-[50px] flex items-center justify-center rounded-[5px] ${
                totalPages === page
                  ? "bg-[#565656] text-[#FFE500]"
                  : "border-[1px] border-black"
              }`}
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>
          )}

          {page !== totalPages && (
            <button
              className="w-[50px] h-[50px] flex items-center justify-center rounded-[5px] border-[1px] border-black"
              onClick={() => setPage(page + 1)}
            >
              <img
                src={nextIcon}
                alt=""
                className="max-w-[35px] max-h-[35px]"
              />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;
