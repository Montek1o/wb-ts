interface Account {
    accountNumber: string;
    owner: string;
    balance: number;

    deposit(amount: number): void;
    withdraw(amount: number): void;
    checkBalance(): void;
}

class DebitAccount implements Account {
    accountNumber: string;
    owner: string;
    balance: number;

    constructor(accountNumber: string, owner: string) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.balance = 0;
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            console.log("Сумма должна быть положительной.");
            return;
        }
        this.balance += amount;
        console.log(`Пополнение счета ${this.accountNumber} на сумму ${amount}. Текущий баланс: ${this.balance}`);
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            console.log("Сумма должна быть положительной.");
            return;
        }
        if (amount > this.balance) {
            console.log(`Недостаточно средств для снятия ${amount}. Текущий баланс: ${this.balance}`);
            return;
        }
        this.balance -= amount;
        console.log(`Снятие со счета ${this.accountNumber} суммы ${amount}. Остаток на счете: ${this.balance}`);
    }

    checkBalance(): void {
        console.log(`Текущий баланс счета ${this.accountNumber}: ${this.balance}`);
    }
}

class CreditAccount implements Account {
    accountNumber: string;
    owner: string;
    balance: number;
    creditLimit: number;
    debt: number;

    constructor(accountNumber: string, owner: string, creditLimit: number) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.balance = 0;
        this.creditLimit = creditLimit;
        this.debt = 0;
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            console.log("Сумма должна быть положительной.");
            return;
        }
        this.balance += amount;
        console.log(`Пополнение счета ${this.accountNumber} на сумму ${amount}. Текущий баланс: ${this.balance}`);
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            console.log("Сумма должна быть положительной.");
            return;
        }
        if (this.balance + this.creditLimit < amount) {
            console.log(`Превышен кредитный лимит. Максимально доступная сумма для снятия: ${this.balance + this.creditLimit}`);
            return;
        }
        if (amount <= this.balance) {
            this.balance -= amount;
        } else {
            this.debt += (amount - this.balance);
            this.balance = 0;
        }
        console.log(`Снятие со счета ${this.accountNumber} суммы ${amount}. Остаток на счете: ${this.balance}, Текущий долг: ${this.debt}`);
    }

    checkBalance(): void {
        console.log(`Текущий баланс счета ${this.accountNumber}: ${this.balance}`);
        console.log(`Текущий долг по кредитному счету ${this.accountNumber}: ${this.debt}`);
    }
}

const debitAccount = new DebitAccount("12345", "Иван Иванов");
debitAccount.deposit(1000);
debitAccount.withdraw(500);
debitAccount.checkBalance();
debitAccount.withdraw(600);

const creditAccount = new CreditAccount("67890", "Петр Петров", 500);
creditAccount.deposit(300);
creditAccount.withdraw(800);
creditAccount.checkBalance();
creditAccount.withdraw(100);
creditAccount.checkBalance();