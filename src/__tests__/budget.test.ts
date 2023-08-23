import { BudgetService } from "../../budgetService";
import { MockList1 } from "../../budgetDB";

describe("budget", () => {
    it('非法起迄', () => {
        const budgetService = new BudgetService(MockList1);
        const test = budgetService.totalAmount('20230102', '20230101');
        expect(test).toBe(0)
    })

    it('跨1個月的預算', () => {
        const budgetService = new BudgetService(MockList1);
        const test = budgetService.totalAmount('20230630', '20230702');
        expect(test).toBe(5000)
    })

    it('跨多個月的預算', () => {
        const budgetService = new BudgetService(MockList1);
        const test = budgetService.totalAmount('20230501', '20230702');
        expect(test).toBe(96000)
    })

    it('當天的預算', () => {
        const budgetService = new BudgetService(MockList1);
        const test = budgetService.totalAmount('20230601', '20230601');
        expect(test).toBe(1000)
    })
})