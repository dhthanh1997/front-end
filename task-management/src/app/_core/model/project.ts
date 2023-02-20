/* eslint-disable @typescript-eslint/ban-types */

export interface Project {
  pagingData: test;
}

export interface test {
  content: [projectContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}
export interface projectContent {
  attachFile?: string;
  createdBy: string;
  createdDate: string;
  customerId: number;
  endDate: string;
  id?: number;
  lastModifiedBy: string;
  lastModifiedDate: string;
  name: string;
  parentId?: number;
  readEndDate: string;
  readStartDate: string;
  revenue?: number;
  startDate: string;
  status: string;
  totalCost: number;
  totalHour: number;
  isChecked?: Boolean;
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
