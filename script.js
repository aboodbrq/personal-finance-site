let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

const form = document.getElementById('transaction-form');
const tableBody = document.getElementById('transactions-table');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const balanceEl = document.getElementById('balance');

function render() {
    tableBody.innerHTML = '';
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((t, index) => {
        const row = document.createElement('tr');

        const typeCell = document.createElement('td');
        typeCell.textContent = t.type === 'income' ? 'دخل' : 'مصروف';

        const categoryCell = document.createElement('td');
        categoryCell.textContent = t.category;

        const amountCell = document.createElement('td');
        amountCell.textContent = t.amount.toFixed(2);

        const dateCell = document.createElement('td');
        dateCell.textContent = t.date;

        const deleteCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'حذف';
        deleteBtn.onclick = () => {
            transactions.splice(index, 1);
            saveAndRender();
        };
        deleteCell.appendChild(deleteBtn);

        row.appendChild(typeCell);
        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        row.appendChild(dateCell);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);

        if (t.type === 'income') totalIncome += t.amount;
        else totalExpense += t.amount;
    });

    totalIncomeEl.textContent = totalIncome.toFixed(2);
    totalExpenseEl.textContent = totalExpense.toFixed(2);
    balanceEl.textContent = (totalIncome - totalExpense).toFixed(2);
}

function saveAndRender() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    render();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value || 'غير محدد';
    const amount = parseFloat(document.getElementById('amount').value || '0');
    const date = document.getElementById('date').value || new Date().toISOString().slice(0, 10);

    if (!amount || amount <= 0) return;

    transactions.push({ type, category, amount, date });
    saveAndRender();
    form.reset();
});

render();
