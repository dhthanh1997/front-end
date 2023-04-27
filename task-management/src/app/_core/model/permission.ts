import { BaseEntity } from "./base";

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

export class permissionContent extends BaseEntity {
  code: string;
  description: string;
  id: number;
  name: string;
  parentCode?: string;
  status?: string;
  type?: string;
  isChecked?: Boolean;
  isCheckedAll?: Boolean;

  constructor() {
    super();
    this.id = 0;
    this.name = '';
    this.code = '';
    this.description = '';
    this.parentCode = '';
    this.status = '';
    this.type = '';
    this.isChecked = false;
  }
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
