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

  //form > requiredの項目が入力されているかの確認
  const form = document.querySelector('#expensesInput');
  if(!form.checkVisibility()){
    form.reportValidity();
    return;
  }

  const id = getLastId();
  const date = document.querySelector('#today').value;
  const descripttion = document.querySelector('#inputDescription') .value;

  //categoryが選択されているか、されていなければalertで通知。選択後にそのvalueを取得
  const selectCategory = document.querySelector('input[name="categories"]:checked');
  if (!selectCategory){
    alert("Please select a category.");
    return;
  }
  const category = selectCategory.value;

  //amountが入力されているか、されていなければalertで通知。選択後にそのvalueを取得
  const amountValue = document.querySelector('#inputAmount').value;
  if (!amountValue){
    alert("Please add amount.");
    return;
  }
  const amount = parseFloat((document.querySelector('#inputAmount').value)).toFixed(2); 
      //parseFloatは小数点以下を含む数値に変換、toFixed(2)で小数点以下2桁にする

  //各項目の入力後各データをdataに格納、localstrageに保存
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