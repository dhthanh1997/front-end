import { BaseEntity } from "./base";

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

export class teamContent extends BaseEntity {
  description?: string;
  id: number;
  teamName: string;
  status?: string;
  isChecked?: Boolean;
  label?: string;

  constructor() {
    super();
    this.id = 0;
    this.teamName = '';
    this.status = '';
    this.label = '';
    this.description = '';
    this.isChecked = false;
  }
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
