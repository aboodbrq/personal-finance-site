let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

const form = document.getElementById('transaction-form');
const tableBody = document.getElementById('transactions-table');

const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const balanceEl = document.getElementById('balance');

function render() {
    tableBody.innerHTML = '';
    let income = 0;
    let expense = 0;

    transactions.forEach((t, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${t.type === 'income' ? 'دخل' : 'مصروف'}</td>
            <td>${t.category}</td>
            <td>${t.amount.toFixed(2)}</td>
            <td>${t.date}</td>
            <td><button onclick="deleteTransaction(${index})">حذف</button></td>
        `;

        tableBody.appendChild(row);

        if (t.type === 'income') income += t.amount;
        else expense += t.amount;
    });

    totalIncomeEl.textContent = income.toFixed(2) + " ريال";
    totalExpenseEl.textContent = expense.toFixed(2) + " ريال";
    balanceEl.textContent = (income - expense).toFixed(2) + " ريال";
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    save();
}

function save() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    render();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value || new Date().toISOString().slice(0, 10);

    if (!amount || amount <= 0) return;

    transactions.push({ type, category, amount, date });
    save();
    form.reset();
});

render();
