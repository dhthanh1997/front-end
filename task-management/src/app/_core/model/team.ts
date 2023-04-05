/* eslint-disable @typescript-eslint/ban-types */
export interface Team {
  pagingData: pagingData;
}

export interface pagingData {
  content: [teamContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export interface teamContent {
  createdBy?: string;
  createdDate?: string;
  description?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  teamName: string;
  status?: string;
  isChecked?: Boolean;
  label? : string;
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
