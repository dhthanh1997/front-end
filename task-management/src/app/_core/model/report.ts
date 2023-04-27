export interface Report {
  pagingData: pagingData;
}

export interface pagingData {
  content: [reportContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export interface reportContent {
  id: number;
  projectId: number;
  taskId: number;
  teamId: number;
  username: string;
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
