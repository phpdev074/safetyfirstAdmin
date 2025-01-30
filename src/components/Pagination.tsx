import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  
  // Function to handle page changes
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  // Generate an array of visible page numbers based on the current page
  const generatePageNumbers = () => {
    const range = 2; // Number of pages to show before and after the current page
    const pages = [];

    // If there are fewer pages than the total number of visible pages, just show all
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Add page numbers around the current page
      if (currentPage - range > 1) {
        pages.push(1);
        if (currentPage - range > 2) pages.push('...');
      }

      // Add current page and range around it
      for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
        pages.push(i);
      }

      if (currentPage + range < totalPages) {
        if (currentPage + range < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Render the pagination buttons and page numbers
  return (
    <div className="flex justify-center mt-4">
      <nav aria-label="Pagination">
        <ul className="inline-flex items-center space-x-1">
          {/* Previous Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-boxdark dark:border-strokedark rounded-l-lg hover:bg-gray-100 dark:hover:bg-strokehover disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-strokedark"
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
          </li>

          {/* Page Numbers */}
          {generatePageNumbers().map((page, index) => (
            <li key={index}>
              {page === '...' ? (
                <span className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-white">...</span>
              ) : (
                <button
                  onClick={() => handlePageChange(Number(page))}
                  className={`px-3 py-1.5 text-sm font-medium border border-gray-300 dark:border-strokedark rounded-lg hover:bg-gray-100 dark:hover:bg-strokehover ${currentPage === page ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-white' : 'bg-white text-gray-500 dark:bg-boxdark dark:text-white'}`}
                >
                  {page}
                </button>
              )}
            </li>
          ))}

          {/* Next Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-boxdark dark:border-strokedark rounded-r-lg hover:bg-gray-100 dark:hover:bg-strokehover disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-strokedark"
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
