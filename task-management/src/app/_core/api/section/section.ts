export interface section {
  pagingData: pagingData;
}

export interface pagingData {
  content: [sectionContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export interface sectionContent {
  id?: number;
  name: string;
  note?: string;
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
