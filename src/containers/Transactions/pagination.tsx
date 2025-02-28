import { TfiControlBackward, TfiControlForward } from "react-icons/tfi";

interface TransactionPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TransactionPagination: React.FC<TransactionPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  // Helper function to create the page numbers range
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Handle click on page number
  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Handle previous page click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex  justify-between px-5 items-center gap-5 mt-4">
      {/* Previous Button */}
      <div
        onClick={handlePreviousPage}
        className={`cursor-pointer ${
          currentPage === 1
            ? "text-gray-500 cursor-not-allowed"
            : "text-[#1F79B0]"
        }`}>
        <TfiControlBackward size={24} />
      </div>

      {/* Page Numbers */}
      <div className="flex flex-wrap gap-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-2 py-1 text-xs rounded-lg ${
              page === currentPage
                ? "bg-[#1F79B0] text-white"
                : "bg-gray-200 text-gray-700"
            }`}>
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div
        onClick={handleNextPage}
        className={`cursor-pointer ${
          currentPage === totalPages
            ? "text-gray-500 cursor-not-allowed"
            : "text-[#1F79B0]"
        }`}>
        <TfiControlForward size={24} />
      </div>
    </div>
  );
};

export default TransactionPagination;
