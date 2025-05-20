/* Kaho starts here */
document.addEventListener('DOMContentLoaded', getToday);
document.addEventListener('DOMContentLoaded', expensesInput);

function getToday(){
  let today = new Date();
  today.setDate(today.getDate());
  let yyyy = today.getFullYear();
  let mm = ("0"+(today.getMonth()+1)).slice(-2); 
  //getMonth()は0〜11で返すため+1が必要、頭に0をつけて２桁にする
  let dd = ("0"+today.getDate()).slice(-2);
  document.querySelector('#today').value = `${yyyy}-${mm}-${dd}`;
}

function expensesInput(){
  document.querySelector('#informationInputSubmit').addEventListener('click', (e) => {
    e.preventDefault(); // prevent default actions(reloading the page) when clicking submit button
  })
}