import React, {Component} from "react";
import VisitColumn from "./VisitColumn";
import {getAllEmployeesNumber, getEmployees} from "../../../../../js/axios";
import {visitColumnTypes} from "../../../../../js/variables";
import EmployeeItem from "../Item/EmployeeItem";
import Loader from 'react-loader-spinner';

class EmployeeColumn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            employeesNumber: 0,
            isLoaded: false,
            isLoading: false,
            portion: 1
        };
    }

    componentDidMount() {
        this.updateEmployeeNumber();
        this.updateEmployees();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.state) !==
            JSON.stringify(nextState) ||
            JSON.stringify(this.props) !==
            JSON.stringify(nextProps);
    }

    componentDidUpdate(prevProps) {
        if (this.props.zone !== prevProps.zone) {
            this.setState({
                portion: 1
            }, () => {
                this.updateEmployees();
            });
        }
        this.updateEmployeeNumber();
    }

    loadEmployees() {
        if(this.state.employees.length !==
            this.state.employeesNumber) {
            this.setState((state) => {
                return {
                    portion: state.portion + 1,
                    isLoading: true
                }
            }, () => {this.updateEmployees()});
        }
    }

    updateEmployeeNumber() {
        const self = this;
        getAllEmployeesNumber(this.props.type, this.props.zone)
            .then(function (result) {
                self.setState({
                    employeesNumber: result.data
                })
            });
    }

    updateEmployees() {
        if(this.state.isLoaded) {
            this.setState({
                isLoaded: false
            });

            const self = this;

            getEmployees(this.props.type,
                this.props.zone,
                this.state.portion).then(function (result) {
                let employees = result.data;

                if (self.state.isLoading) {
                    employees = self.state.employees.concat(employees);
                }

                employees.map(item => {
                    item.lastVisits = item.lastVisits.filter(visitItem => {
                        return (visitItem.zone.id === self.props.zone
                            || self.props.zone === null)
                            && self.props.type === visitItem.type;
                    });
                    item.lastVisits.sort(function (a, b) {
                        if (a.time < b.time)
                            return 1;
                        if (a.time > b.time)
                            return -1;
                        return 0;
                    });
                    return item;
                });


                self.setState({
                    employees: employees,
                    isLoaded: true,
                    isLoading: false
                });
            });
        }
    }

    render() {
        const type = this.props.type;
        const header =
            (type === visitColumnTypes.employee.inBuild ?
                "сотрудники в зоне: " :
                "сотрудники, вышедшие из зоны: ") +
            this.state.employeesNumber;

        const items = this.state.employees.map((employee) =>
            <EmployeeItem data={employee}
                          key={employee.id}
                          getPersonalHistory={this.props.getPersonalHistory}
                          selectedUser={this.props.selectedUser}
                          type={type}/>
        );

        const body = !this.state.isLoaded ? (
                this.state.isLoading ?
                    <div>
                        {items}
                        <Loader
                            type="Oval"
                            color="#75BDBD"
                            height={33}
                            width={33}
                            className={"column-adding-loader"}
                        />
                    </div> :
                    <Loader
                        type="Oval"
                        color="#75BDBD"
                        height={33}
                        width={33}
                        className={"column-loader"}
                    />
            )
            :
            (this.state.employees.length ?
                    items :
                    <div className={"column-no-data"}>Данных нет</div>
            );


        return (
            <VisitColumn header={header}
                         body={body}
                         onLoad={() => {
                             this.loadEmployees()
                         }}/>

        );
    }
}

export default EmployeeColumn;