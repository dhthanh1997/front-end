export interface MenuItem {
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
        title: 'Công việc của tôi',
        code: 'task',
        icon: '',
        type: 'task',
        theme: 'outline',
        path: 'task',
        class: '',
        children: [],
    },
    {
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
        title: 'Thiết lập',
        code: 'home',
        icon: '',
        type: 'setting',
        theme: 'outline',
        path: 'setting',
        class: '',
        children: [
            {
                title: 'Nhân viên',
                code: 'member_setting',
                icon: '',
                type: 'setting',
                theme: 'outline',
                path: 'member',
                class: '',
                children: [],
            },
            {
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
                title: 'Nhóm quyền',
                code: 'role',
                icon: '',
                type: 'key',
                theme: 'outline',
                path: 'role',
                class: '',
                children: [],
            },
            {
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