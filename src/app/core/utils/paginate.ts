import { PaginationOptions } from '@src/app/core/types/pagination-options';

export function paginate<T>({
  list,
  limit = list.length,
  page = 1
}: PaginationOptions & { list: T[] }) {
  const startIndex = (page - 1) * limit;

  const endIndex = startIndex + limit;

  return list.slice(startIndex, endIndex);
}
