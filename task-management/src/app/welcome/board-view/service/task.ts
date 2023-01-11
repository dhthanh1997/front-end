/* eslint-disable @typescript-eslint/ban-types */
export interface Task {
  pagingData: pagingData;
}

export interface pagingData {
  content: [content];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export interface content {
  attachFile: string;
  createdBy: string;
  createdDate: string;
  description: string;
  endDate: string;
  id: number;
  lastModifiedBy: string;
  lastModifiedDate: string;
  name: string;
  parentId?: number;
  projectId: number;
  readEndDate: string;
  readStartDate: string;
  revenue: number;
  startDate: string;
  status: string;
  totalCost: string;
  totalHour: string;
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
