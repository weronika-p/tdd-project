class Money {
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }
    times(multiplier) {
        return new Money(this.amount * multiplier, this.currency);
    }
    divide(divider) {
        return new Money(this.amount / divider, this.currency);
    }
}

module.exports = Money;