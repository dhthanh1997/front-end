/* eslint-disable @typescript-eslint/ban-types */
export interface Comment {
  pagingData: pagingData;
}

export interface pagingData {
  content: [commentContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export interface commentContent {
  activityId?: number;
  attachFile?: string;
  content: string;
  createdBy?: string;
  createdDate?: string;
  description: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  name: string;
  parentId?: number;
  status?: string;
  taskId: number;
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
