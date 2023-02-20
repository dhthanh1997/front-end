/* eslint-disable @typescript-eslint/ban-types */
export interface Tag {
  pagingData: pagingData;
}

export interface pagingData {
  content: [tagContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export interface tagContent {
  createdBy: string;
  createdDate: string;
  icon?: string;
  id: number;
  lastModifiedBy: string;
  lastModifiedDate: string;
  name: string;
  slug: string;
  status: string;
  isChecked?: Boolean;
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
