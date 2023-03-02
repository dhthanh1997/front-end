export interface AccessToken {
    sub?: string;
    code?: string;
    exp?: number;
    iat?: number;
    permissions?: any[];
    role?: any[];
    position?: string;
    fullname?: string;
    departmentId?:number;
}