import { BaseEntity } from "./base";

/* eslint-disable @typescript-eslint/ban-types */
export interface roleApp {
  pagingData: pagingData;
}

export interface pagingData {
  content: [roleAppContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export class roleAppContent extends BaseEntity {
  code: string;
  description: string;
  id: number;
  name: string;
  status?: string;
  isChecked?: Boolean;

  constructor() {
    super();
    this.id = 0;
    this.name = '';
    this.code = '';
    this.description = '';
    this.status = '';
    this.isChecked = false;
  }
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
