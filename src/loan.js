/*
 * @Description:
 * @Author: wzh
 * @Date: 2023-03-15 11:10:51
 * @LastEditTime: 2023-03-15 14:29:27
 * @LastEditors: wzh
 */
const EQUAL_LOAN = 0;
const EQUAL_PRINCIPAL = 1;
class Loan {
  constructor(
    principal = 200000,
    year_rate = 4.2,
    year = 20,
    paymentType = 0
  ) {
    this.paymentType = paymentType;
    this.principal = principal * 10000; // 本金

    this.rate = year_rate / 100 / 12;
    this.n = year * 12;
    this.payByEqualLoan = [];
    this.payByEqualPrincipal = [];
    this.calPayByEqualLoan();
    this.calPayByEqualPrincipal();
  }
  payPerMonth(principalLeft, paymentType = 0) {
    let pay = 0;
    if (paymentType == EQUAL_PRINCIPAL || this.rate == 0) {
      pay = this.principal / this.n + principalLeft * this.rate;
    } else {
      pay =
        (this.principal * this.rate * Math.pow(1 + this.rate, this.n)) /
        (Math.pow(1 + this.rate, this.n) - 1);
    }
    return pay;
  }
  interestPerMonth(principalLeft) {
    let interest = principalLeft * this.rate;
    return interest;
  }

  calPayByEqualLoan() {
    let principalLeft = this.principal;
    let i = 1;
    let sumInterest = 0;
    let sumPaidPrincipal = 0;
    while (i <= this.n) {
      let interest = this.interestPerMonth(principalLeft);
      let pay = this.payPerMonth(principalLeft, EQUAL_LOAN);
      let paidPrincipal = pay - interest;
      principalLeft = principalLeft - paidPrincipal;
      sumPaidPrincipal += paidPrincipal;
      sumInterest += interest;
      this.payByEqualLoan.push(
        [
          pay,
          paidPrincipal,
          interest,
          principalLeft,
          sumPaidPrincipal,
          sumInterest,
        ].map((v) => this.round(v))
      );
      i++;
    }
    return this.payByEqualLoan;
  }
  calPayByEqualPrincipal() {
    let principalLeft = this.principal;
    let i = 1;
    let sumInterest = 0;
    let sumPaidPrincipal = 0;
    while (i <= this.n) {
      let interest = this.interestPerMonth(principalLeft);
      let pay = this.payPerMonth(principalLeft, EQUAL_PRINCIPAL);
      let paidPrincipal = pay - interest;
      principalLeft = principalLeft - paidPrincipal;
      sumPaidPrincipal += paidPrincipal;
      sumInterest += interest;
      this.payByEqualPrincipal.push(
        [
          pay,
          paidPrincipal,
          interest,
          principalLeft,
          sumPaidPrincipal,
          sumInterest,
        ].map((v) => this.round(v))
      );
      i++;
    }
    return this.payByEqualPrincipal;
  }

  round(num, precise = 2) {
    return parseFloat(num.toFixed(precise));
  }
}
