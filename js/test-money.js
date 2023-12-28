const assert = require('assert');
const Money = require('./money');
const Portfolio = require('./portfolio');

class MoneyTest {
    testMultiplication() {
        let tenEuros = new Money(10, 'EUR');
        let twentyEuros = new Money(20, 'EUR');
        assert.deepStrictEqual(tenEuros.times(2), twentyEuros);
    }

    testDivision() {
        let originalMoney = new Money(4002, 'KRW');
        let actualMoneyAfterDivision = originalMoney.divide(4);
        let expectedMoneyAfterDivision = new Money(1000.5, 'KRW');
        assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision);
    }

    testAddition() {
        let fiveDollars = new Money(5, 'USD');
        let tenDollars = new Money(10, 'USD');
        let fifteenDollars = new Money(15, 'USD');
        let portfolio = new Portfolio();
        portfolio.add(fiveDollars, tenDollars);
        assert.deepStrictEqual(portfolio.evaluate('USD'), fifteenDollars);
    }

    testAdditionOfDollarsAndEuros() {
        let fiveDollars = new Money(5, 'USD');
        let tenEuros = new Money(10, 'EUR');
        let portfolio = new Portfolio();
        portfolio.add(fiveDollars, tenEuros);
        let expectedValue = new Money(17, 'USD');
        assert.deepStrictEqual(portfolio.evaluate('USD'), expectedValue);
    }

    runAllTests() {
        let testMethods = this.getAllTestMethods();
        testMethods.forEach((test) => {
            console.log('Running: %s()', test);
            let method = Reflect.get(this, test);
            try {
                Reflect.apply(method, this, []);    
            } catch (error) {
                if (error instanceof assert.AssertionError) {
                    console.log(error);
                } else {
                    throw error;
                }
            }
            
        });
    }

    getAllTestMethods() {
        let moneyProperties = MoneyTest.prototype;
        let allProps = Object.getOwnPropertyNames(moneyProperties);
        let testMethods = allProps.filter((prop) => typeof moneyProperties[prop] === 'function' && prop.startsWith('test'));
        return testMethods;
    }
}

new MoneyTest().runAllTests();