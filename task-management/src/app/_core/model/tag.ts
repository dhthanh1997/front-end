import { BaseEntity } from "./base";

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

export class tagContent extends BaseEntity {
  color: string;
  icon?: string;
  id: number;
  name: string;
  slug?: string;
  status?: string;

  constructor() {
    super();
    this.id = 0;
    this.name = '';
    this.color = '';
    this.icon = '';
    this.slug = '';
    this.status = '';
  }

}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
