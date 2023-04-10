import { BaseEntity } from "./base";

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

export class memberContent extends BaseEntity {
  id: number;
  name: string;
  email: string;
  phone: string;
  roleId: number;
  status: string;
  username: string;
  teams: [];
  isChecked: Boolean;

  constructor() {
    super();

    this.id = 0;
    this.name = '';
    this.email = '';
    this.phone = '';
    this.roleId = 0;
    this.status = '';
    this.username = '';
    this.teams = [];
    this.isChecked = false;
  }
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
