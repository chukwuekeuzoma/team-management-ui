export const useClientPagination = <T,>(
  items: T[],
  page: number,
  pageSize: number
) => {
  const total = items.length;
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);
  return { paged, total, start, pageSize };
};

export const generatePageNumbers = (page: number, totalPages: number) => {
  const pages = [];
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
};
