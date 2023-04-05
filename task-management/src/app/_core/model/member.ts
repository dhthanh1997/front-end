/* eslint-disable @typescript-eslint/ban-types */
export interface Member {
  pagingData: pagingData;
}

export interface pagingData {
  content: [memberContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export interface memberContent {
  createdBy?: string;
  createdDate?: string;
  email: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  name: string;
  phone: string;
  roleId?: number;
  status?: string;
  username: string;
  teams: [];
  isChecked?: Boolean;
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
