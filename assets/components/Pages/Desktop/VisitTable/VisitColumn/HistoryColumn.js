import React, { Component } from "react";
import VisitColumn from "./VisitColumn";
import {getAllEmployeesNumber, getAllHistoryNumber, getHistory} from "../../../../../js/axios";
import HistoryItem from "../Item/HistoryItem";
import DatePicker from "react-datepicker/es/index";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import {registerLocale} from "react-datepicker";
import Loader from 'react-loader-spinner';
registerLocale('ru', ru);

class HistoryColumn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
            historyNumber: 0,
            periodStart: new Date(),
            periodEnd: new Date(),
            idLoaded: true,
            isLoading: false,
            portion: 1
        };

        this.changePeriodStart = this.changePeriodStart.bind(this);
        this.changePeriodEnd = this.changePeriodEnd.bind(this);
    }

    componentDidMount() {
        this.updateHistoryNumber();
        this.updateHistory();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.state) !==
            JSON.stringify(nextState) ||
            JSON.stringify(this.props) !==
            JSON.stringify(nextProps);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props) !==
            JSON.stringify(prevProps)) {
            this.setState({
                portion: 1
            }, () => {
                this.updateHistory();
            });
        }
        this.updateHistoryNumber();
    }

    changePeriodStart(date) {
        this.setState({
            periodStart: date
        },() => {this.updateHistory()});
    }

    changePeriodEnd(date) {
        this.setState({
            periodEnd: date
        },() => {this.updateHistory()});
    }

    loadHistory() {
        if(this.state.history.length !==
            this.state.historyNumber) {
            this.setState((state) => {
                return {
                    portion: state.portion + 1,
                    isLoading: true
                }
            }, () => {this.updateHistory()});
        }
    }

    updateHistoryNumber() {
        const self = this;
        const period = {
            start: this.state.periodStart,
            end: this.state.periodEnd
        };

        getAllHistoryNumber(period, this.props.zone, this.props.selectedUser)
            .then(function (result) {
                self.setState({
                    historyNumber: result.data
                })
            });
    }

    updateHistory() {
        if(this.state.isLoaded) {
            this.setState({
                isLoaded: false
            });
            const self = this;
            const period = {
                start: self.state.periodStart,
                end: self.state.periodEnd
            };
            getHistory(period,
                this.props.zone,
                this.props.selectedUser,
                this.state.portion).then(function (result) {
                let history = result.data;
                if (self.state.isLoading) {
                    history = self.state.history.concat(history);
                }

                self.setState({
                    history: history,
                    isLoaded: true,
                    isLoading: false
                });
            });
        }
    }

    render() {
        const header =
            <div className={"history-column-header"}>
                история посещений
                с <DatePicker
                selected={this.state.periodStart}
                locale="ru"
                selectsStart
                onChange={this.changePeriodStart}
                endDate={this.state.periodEnd}
                dateFormat="dd.MM.yyyy"
                withPortal
                className="history-date-picker"/>

                по <DatePicker
                selected={this.state.periodEnd}
                locale="ru"
                selectsEnd
                startDate={this.state.periodStart}
                onChange={this.changePeriodEnd}
                dateFormat="dd.MM.yyyy"
                withPortal
                className="history-date-picker"/>
            </div>;

        const items = this.state.history.map((item) =>
            <HistoryItem data={item}
                         key={item.id}/>
        );

        let body;

        if (!this.state.isLoaded) {
            const loader = <Loader
                type="Oval"
                color="#75BDBD"
                height={33}
                width={33}
                className={this.state.isLoading ? "column-adding-loader" : "column-loader"}
            />;

            if (this.state.isLoading) {
                body = <div>
                    {items}
                    {loader}
                </div>
            }
            else {
                body = loader
            }
        }
        else if (this.state.history.length) {
            body = items;
        }
        else {
            body = <div className={"column-no-data"}>Данных нет</div>;
        }

        return (
            <VisitColumn header={header}
                         body={body}
                         onLoad={() => {this.loadHistory();}}/>
        );
    }
}

export default HistoryColumn;