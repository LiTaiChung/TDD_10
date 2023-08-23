export class Budget {
    constructor(
      public YearMonth: string,
      public Amount: number,
    ) {}
  }
  
export const MockList1: Budget[] = [
    new Budget('202301', 31000),
    new Budget('202302', 28000),
    new Budget('202303', 62000),
    new Budget('202304', 30000),
    new Budget('202305', 62000),
    new Budget('202306', 30000),
    new Budget('202307', 62000),
    new Budget('202308', 0),
    new Budget('202309', 3000),
    new Budget('202310', 3100),
    new Budget('202311', 30000),
    new Budget('202312', 62000),
  ]