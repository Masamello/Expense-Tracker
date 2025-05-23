/* Kaho starts here */
document.addEventListener('DOMContentLoaded', getToday);

function getToday(){
  let today = new Date();
  today.setDate(today.getDate());
  let yyyy = today.getFullYear();
  let mm = ("0"+(today.getMonth()+1)).slice(-2); 
  //getMonth()は0〜11で返すため+1が必要、頭に0をつけて２桁にする
  let dd = ("0"+today.getDate()).slice(-2);
  document.querySelector('#today').value = `${yyyy}-${mm}-${dd}`;
}

//information input section button click event
document.querySelector('#informationInputSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const date = document.querySelector('#today').value;
  const amount = parseFloat((document.querySelector('#inputAmount').value)).toFixed(2); 
    //parseFloatは小数点以下を含む数値に変換、toFixed(2)で小数点以下2桁にする
  const descripttion = document.querySelector('#inputDescription') .value;
  const category = document.querySelector('input[name="categories"]:checked').value;
  const id = getLastId();
  const data = {date: date, amount: amount, descripttion: descripttion, category: category};
  
  localStorage.setItem(id, JSON.stringify(data));
});

function getLastId(){
  let lastId = localStorage.getItem('id');
  console.log("lastId(before parse):", localStorage.getItem('id'));
  lastId = lastId !== null ? parseInt(lastId) : 0; //lastIdが存在すればintegerにして取得、なければ0を返す
  console.log("lastId(after parse):", lastId);
  const newId = lastId + 1;
  localStorage.setItem('id', newId);
  return newId;
};