//////////////////////////////
//           MENU           //
//////////////////////////////

export const DESKTOP_PAGE_ID = 1;
export const STATISTICS_PAGE_ID = 2;
export const DATABASE_PAGE_ID = 3;
export const SETTINGS_ID = 4;
export const EXPORT_PAGE_ID = 5;

export const menuItems = [
    {id: DESKTOP_PAGE_ID, name: "рабочий стол", link: "/desktop"},
    {id: STATISTICS_PAGE_ID, name: "статистика", link: "/statistics"},
    {id: DATABASE_PAGE_ID, name: "база людей", link: "/database"},
    {id: SETTINGS_ID, name: "настройка устройств", link: "/settings"},
    {id: EXPORT_PAGE_ID, name: "экспорт данных", link: "/export"},
];

//////////////////////////////
//          DESKTOP         //
//////////////////////////////

export const visitColumnTypes = {
    employee: {
        inBuild: "employee_in",
        outBuild: "employee_out"},
    history: "history"
};

export const columnLimit = 10;