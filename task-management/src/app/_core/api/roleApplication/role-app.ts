/* eslint-disable @typescript-eslint/ban-types */
export interface Member {
  pagingData: pagingData;
}

export interface pagingData {
  content: [roleAppContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export interface roleAppContent {
  code: string;
  createdBy?: string;
  createdDate?: string;
  description: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  name: string;
  status?: string;
  isChecked?: Boolean;
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
