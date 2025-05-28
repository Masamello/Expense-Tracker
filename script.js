let chartInstance = null; // グローバル変数として保持（再描画のため）

function renderChartWithChartJS() {
  const data = getAllExpenseData();
  const totals = calculateCategoryTotals(data);

  const ctx = document.getElementById('expenseChart').getContext('2d');

  // 既存チャートがある場合は破棄してから再描画
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(totals),
      datasets: [{
        label: 'Category Totals',
        data: Object.values(totals),
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#ffcd56',
          '#4bc0c0',
          '#9966ff',
          '#ff9f40',
          '#c9cbcf'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const amount = tooltipItem.raw;
              return `${tooltipItem.label}: $${amount.toFixed(2)}`;
            }
          }
        }
      }
    }
  });
}

function getAllExpenseData() {
  const expenses = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key !== 'id') {
      const value = JSON.parse(localStorage.getItem(key));
      expenses.push(value);
    }
  }
  return expenses;
}

function calculateCategoryTotals(data) {
  const totals = {};
  for (let category of categories) {
    totals[category] = 0;
  }

  data.forEach(item => {
    if (totals[item.category] !== undefined) {
      totals[item.category] += parseFloat(item.amount);
    }
  });

  return totals;
}

document.addEventListener('DOMContentLoaded', renderChartWithChartJS);
