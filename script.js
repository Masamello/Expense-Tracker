function populateTableByBudgetExpense(){
  const data = getAllExpenseData();
  for(prObj of data){
    const tr = document.createElement("tr");
    for(let info of Object.values(prObj)){
      const td = document.createElement("td");
      td.innerText = info;
      tr.append(td);
    }
    document.querySelector("#categoriesInfo").append(tr);
  }
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

document.addEventListener('DOMContentLoaded', populateTableByBudgetExpense)