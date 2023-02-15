import { BaseEntity } from "./base";

export class Section extends BaseEntity {
  id: number;
  name: string;
  note: string;

  constructor() {
    super();
    this.id = 0;
    this.name = '';
    this.note = '';
  }
}


export interface section {
  pagingData: pagingData;
}

export interface pagingData {
  content: [sectionContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export interface sectionContent {
  id?: number;
  name: string;
  note?: string;
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
