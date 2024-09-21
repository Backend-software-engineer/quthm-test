export const createPaginatedResponse = (
  records: Array<any>,
  count: number,
  page: number,
  limit: number,
) => {
  const pages = Math.ceil(count / limit);
  const hasPrevPage = page > 1;
  const hasNextPage = page < pages;
  return {
    count: count,
    totalPages: pages,
    hasPrevPage: hasPrevPage,
    hasNextPage: hasNextPage,
    records,
  };
};
