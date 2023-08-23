import { Budget } from "./budgetDB";
import dayjs from "dayjs";

export class BudgetService {
    List: Budget[] = [];

    constructor(BudgetList: Budget[]) {
        this.List = BudgetList;
    }

    totalAmount(start: string, end: string) {
        const startDate = dayjs(start);
        const startYearMonth = dayjs(start).format('YYYYMM');
        const endDate = dayjs(end);
        const endYearMonth = dayjs(end).format('YYYYMM');

        // 非法起迄
        if(dayjs(end).isBefore(dayjs(start))) return 0;

        // Get Data
        const datas = this.List.filter((data) => new Date(data.YearMonth) >= new Date(startYearMonth) &&  new Date(data.YearMonth) <= new Date(endYearMonth));

        const sumTotal = datas.reduce((total, curr) => total + curr.Amount, 0);

        // 取得 start 當月第一天
        const startStartDayOfMonth = dayjs(startYearMonth).startOf('month');
        // 計算剩餘天數
        const startRemainingDays = startDate.diff(startStartDayOfMonth, 'day');

        // 取得 end 當月最後一天
        const endLastDayOfMonth = dayjs(endYearMonth).endOf('month');
        // 計算剩餘天數
        const endRemainingDays = endLastDayOfMonth.diff(endYearMonth, 'day') -1;

        // 取 Start Data
        const getStartData = datas.find((data) => data.YearMonth === startYearMonth);
        // 取 End Data
        const getEndData = datas.find((data) => data.YearMonth === endYearMonth);

        if(!getStartData || !getEndData) return 0;

        // 當天
        if(startYearMonth === endYearMonth) {
            return getStartData.Amount / dayjs(startYearMonth).daysInMonth();
        }

        const startBudget = getStartData.Amount / dayjs(startYearMonth).daysInMonth() * startRemainingDays;

        const endBudget = getEndData.Amount / dayjs(endYearMonth).daysInMonth() * endRemainingDays;
    
        const total = sumTotal - startBudget - endBudget;

        return total;
    }

    getAll() {
        return this.List;
    }
}

// dayjs(StartDate).diff(EndDate,'day)

// totalAmount('20230601','20230601');
//   totalAmount('20230601','20230604');
//   totalAmount('20230630','20230702');
//   totalAmount('20230601','20230702');
//   totalAmount('20230701','20230802');
//   totalAmount('20230301','20230102');