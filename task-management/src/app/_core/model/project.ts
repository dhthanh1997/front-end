import { BaseEntity } from "./base";

export class Project extends BaseEntity {
  attachFile?: string;
  customerId?: number;
  endDate?: string;
  id: number;
  name: string;
  parentId?: number;
  revenue?: number;
  startDate?: string;
  totalCost?: number;
  totalHour?: number;
  isChecked?: Boolean;
  isShow: Boolean;

  constructor() {
    super();
    this.id = 0;
    this.name = '';
    this.startDate = '';
    this.endDate = '';
    this.revenue = 0;
    this.totalCost = 0;
    this.totalHour = 0;
    this.isChecked = false;
    this.isShow = false;
  }
}

export interface project {
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
