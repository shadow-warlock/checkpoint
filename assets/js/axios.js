import axios from "axios/index";
import {columnLimit} from "./variables";

export function getEmployees(eventType, zone, portion) {
    let axiosData = {
        customCriteria: {
            type: eventType
        },
        limit: columnLimit,
        offset: (portion - 1) * columnLimit
    };

    if(zone !== null) {
        axiosData.customCriteria.zone = zone;
    }

    return axios.post(
        "/api/employee/get",
        axiosData
    )
}

export function getHistory(period,zone,user) {
    let axiosData = {
        criteria: [
            {
                value: period.start.toLocaleDateString() + " 00:00:00",
                sign: "gte",
                multiple: "AND",
                field: "time",
                type: "datetime"
            },
            {
                value: period.end.toLocaleDateString() + " 23:59:59",
                sign: "lte",
                multiple: "AND",
                field: "time",
                type: "datetime"
            }
        ],
        limit: 10,
        offset: 0,
        order:{
            time:"DECS"
        },
        linkedCriteria: {}
    };

    if(user !== null) {
        axiosData.linkedCriteria.employee = {
            multiple: "AND",
            entity: "Employee",
            criteria: [
                {
                    value: user,
                    sign: "eq",
                    multiple: "AND",
                    field: "id"
                }
            ]
        }
    }

    if(zone !== null) {
        axiosData.linkedCriteria.zone = {
            multiple: "AND",
            entity: "Zone",
            criteria: [
                {
                    value: zone,
                    sign: "eq",
                    multiple: "AND",
                    field: "id"
                }
            ]
        }
    }

    return axios.post(
            "/api/visit/get",
            axiosData
        )
}

export function getZones() {
    return axios.post(
            "/api/zone/get",
            {}
        )
}

export function getVisitsNumberToday(type) {
    return axios.post(
        "/api/visit/count",
        {
            criteria: [
                {
                    value: new Date().toLocaleDateString() + " 00:00:00",
                    sign: "gte",
                    multiple: "AND",
                    field: "time",
                    type: "datetime"
                },
                {
                    value: new Date().toLocaleDateString() + " 23:59:59",
                    sign: "lte",
                    multiple: "AND",
                    field: "time",
                    type: "datetime"
                },
                {
                    value: type,
                    sign: "eq",
                    multiple: "AND",
                    field: "type"
                }
            ],
        }
    );
}

export function getUnrecognizedNumberToday() {
    return axios.post(
        "/api/visit/count",
        {
            criteria: [
                {
                    value: new Date().toLocaleDateString() + " 00:00:00",
                    sign: "gte",
                    multiple: "AND",
                    field: "time",
                    type: "datetime"
                },
                {
                    value: new Date().toLocaleDateString() + " 23:59:59",
                    sign: "lte",
                    multiple: "AND",
                    field: "time",
                    type: "datetime"
                }
            ],
            linkedCriteria: {
                employee: {
                    multiple: "AND",
                    entity: "Employee",
                    criteria: [
                        {
                            value: 666,
                            sign: "eq",
                            multiple: "AND",
                            field: "id"
                        }
                    ]
                }
            }
        }
    );
}


export function getAllEmployeesNumberToday() {
    return axios.post(
        "/api/employee/count",
        {}
    );
}