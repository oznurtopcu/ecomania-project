export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 my-12 font-bold">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`h-10 px-2 flex items-center justify-center rounded-md ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-[#BDBDBD] hover:text-white hover:bg-[#23A6F0]"
        } transition-colors`}
      >
        {"Previous"}
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-10 h-10 flex items-center justify-center rounded-md ${
            currentPage === number
              ? "bg-[#23A6F0] text-white"
              : "text-[#BDBDBD] hover:text-white hover:bg-[#23A6F0]"
          } transition-colors`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`h-10 px-2 flex items-center justify-center rounded-md ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-[#BDBDBD] hover:text-white hover:bg-[#23A6F0]"
        } transition-colors`}
      >
        {"Next"}
      </button>
    </div>
  );
}
