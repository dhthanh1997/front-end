export interface MenuItem {
    id:number;
    title: string;
    icon: string;
    code: string;
    type: string;
    theme: string;
    path: string;
    class: string;
    children: MenuItem[];
}

export const menuItem: MenuItem[] = [
    {
        id: 1,
        title: 'Trang chủ',
        code: 'home',
        icon: '',
        type: 'home',
        theme: 'outline',
        path: 'home',
        class: '',
        children: [],
    },
    {
        id: 2,
        title: 'Dự án',
        code: 'project',
        icon: '',
        type: 'project',
        theme: 'outline',
        path: 'project',
        class: '',
        children: [],
    },
    {
        id: 3,
        title: 'Công việc của tôi',
        code: 'task',
        icon: '',
        type: 'check-circle',
        theme: 'outline',
        path: 'task',
        class: '',
        children: [],
    },
    {
        id: 4,
        title: 'Báo cáo',
        code: 'report',
        icon: '',
        type: 'reconciliation',
        theme: 'outline',
        path: 'report',
        class: '',
        children: [],
    },
    {
        id: 5,
        title: 'Thiết lập',
        code: 'setting',
        icon: '',
        type: 'setting',
        theme: 'outline',
        path: 'setting',
        class: '',
        children: [
            {
                id: 51,
                title: 'Nhân viên',
                code: 'member_setting',
                icon: '',
                type: 'usergroup-add',
                theme: 'outline',
                path: 'member',
                class: '',
                children: [],
            },
            {
                id: 52,
                title: 'Nhóm',
                code: 'team_setting',
                icon: '',
                type: 'usergroup-add',
                theme: 'outline',
                path: 'team',
                class: '',
                children: [],
            },
            {
                id: 53,
                title: 'Nhóm quyền',
                code: 'role_setting',
                icon: '',
                type: 'key',
                theme: 'outline',
                path: 'roles-app',
                class: '',
                children: [],
            },
            {
                id: 54,
                title: 'Quyền',
                code: 'permission_setting',
                icon: '',
                type: 'key',
                theme: 'outline',
                path: 'permission',
                class: '',
                children: [],
            }

        ],
    },


]