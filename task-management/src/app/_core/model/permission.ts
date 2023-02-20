/* eslint-disable @typescript-eslint/ban-types */
export interface Member {
  pagingData: pagingData;
}

export interface pagingData {
  content: [permissionContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export interface permissionContent {
  code: string;
  createdBy?: string;
  createdDate?: string;
  description: string;
  id: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  name: string;
  parentCode?: string;
  status?: string;
  type?: String;
  isChecked?: Boolean;
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
