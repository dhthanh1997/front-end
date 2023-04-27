import { BaseEntity } from "./base";

export interface rolePermission {
  pagingData: pagingData;
}

export interface pagingData {
  content: [rolePermissionContent];
  pageable: pageable;
  totalElements: number;
  totalPages?: number;
  size?: number;
}

export interface rolePermissionContent {
  id: number;
  permissionId: number;
  roleId: number;
}

export interface pageable {
  pageNumber: number;
  pageSize: number;
}
