/* Kaho starts here */
const categories = ['food', 'phone_charge', 'transportation', 'entertainment', 'rent', 'clothes', 'others'];

document.addEventListener('DOMContentLoaded', getToday);
document.addEventListener('DOMContentLoaded', setCategories(categories));
document.addEventListener('DOMContentLoaded', displayTable);

//-----information input section-----
function getToday(){
  let today = new Date();
  today.setDate(today.getDate());
  let yyyy = today.getFullYear();
  let mm = ("0"+(today.getMonth()+1)).slice(-2); 
  //getMonth()は0〜11で返すため+1が必要、頭に0をつけて２桁にする
  let dd = ("0"+today.getDate()).slice(-2);
  document.querySelector('#today').value = `${yyyy}-${mm}-${dd}`;
}

//categories埋め込み
function setCategories(categories) {
  const addInputs = document.querySelector('.categories');
  for (category of categories) {
    const inputs = document.createElement('input');
    inputs.classList.add('btn-check');
    inputs.setAttribute('type','radio');
    inputs.setAttribute('id','categories'+category);
    inputs.setAttribute('name','categories');
    inputs.setAttribute('value',category);
    addInputs.append(inputs);

    const labels = document.createElement('label');
    labels.classList.add('btn', 'btn-outline-primary','rounded', 'm-1');
    labels.setAttribute('for', 'categories'+category);
    labels.innerText = capitalizeFirstLetter(category);
    addInputs.append(labels);
  }
}

//最後のID取得
function getLastId(){
  let lastId = localStorage.getItem('id');
  // console.log("lastId(before parse):", localStorage.getItem('id'));
  lastId = lastId !== null ? parseInt(lastId) : 0; //lastIdが存在すればintegerにして取得、なければ0を返す
  // console.log("lastId(after parse):", lastId);
  const newId = lastId + 1;
  localStorage.setItem('id', newId);
  return newId;
};

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
  const description = document.querySelector('#inputDescription') .value;

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
  const amount = (parseFloat((document.querySelector('#inputAmount').value))).toFixed(2); 
      //parseFloatは小数点以下を含む数値に変換、toFixed(2)で小数点以下2桁にする

  //各項目の入力後各データをdataに格納、localstrageに保存
  const data = {date: date, category: category, amount: amount, description: description};
  localStorage.setItem(id, JSON.stringify(data));
  
  //テーブルに表示
  displayTable();
});

//browser > localStrageに保存されているデータを取得、テーブルに表示
function displayTable() {
  const tbody = document.querySelector('tbody');
  tbody.innerText = '';
  const dataArray = [];

  for (let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);
    if (key !== 'id'){
      const value = JSON.parse(localStorage.getItem(key));
      // tableBody(value, key);
      dataArray.push({key, value}); //データを配列に取得
    };
  };
  dataArray.sort((a, b) => { //a,b は各object{key: id, value: {date: "", .....}}
    const dateA = new Date(a.value.date); 
    const dateB = new Date(b.value.date);
    return dateA - dateB; //dateA - dateB < 0 : a を b より前にする(昇順)
  });

  for (let item of dataArray) {
    tableBody(item.value, item.key);
  }
};

//button作成 (edit/delete/save/cancelなどで複数回利用)
function button (func, type) { //edit,delete,などの目的functionとbootstrap用typeを受け取ってボタンを作成
  const btn = document.createElement('button');
  btn.classList.add('btn','btn-'+type,func+'Btn');
  btn.innerText = func;
  return btn;
};

//categories選択肢表示時の文字整形
function capitalizeFirstLetter(words){
  const splitWords = words.split('_');
  let capitalWords = [];
  for (let word of splitWords) {
    let capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    capitalWords.push(capitalized);
  }
  return capitalWords.join(' ');
}

//data,idを受け取ってテーブルへ反映
const tableBody = (data, id) => {
  const tr = document.createElement('tr');
  tr.dataset.id = id; 

  for (let itemKey in data) {
    const td = document.createElement('td');
    // console.log('itemkey',itemKey);
    if (itemKey === 'category') {
      td.innerText = capitalizeFirstLetter(data[itemKey]);
    }else {
      td.innerText = data[itemKey];
    }
    tr.append(td);
  }
  //edit button追加
  const editTd = document.createElement('td');
  editTd.append(button('edit', 'light')); //button function呼び出し

  //delete button追加
  const deleteTd = document.createElement('td');
  deleteTd.append(button('delete', 'light')); //button function呼び出し
  tr.append(editTd, deleteTd);
  document.querySelector('.infoTable').append(tr);
}

//-----Edit,Deleteボタン機能追加------
document.querySelector('.infoTable').addEventListener('click', (e) =>{
  const targetRow = e.target.parentElement.parentElement;
  const id = targetRow.dataset.id; // 保存対象ID取得

  if (e.target.classList.contains('editBtn')) {  //Editボタン
    const tdAll = targetRow.querySelectorAll('td'); //editを押した行のtdを取得
    for (let i = 0; i < tdAll.length; i++) { //各tdをinput element/save/cancel buttonに置換
      const eachTd = tdAll[i];
      if (i === tdAll.length - 2) {
        eachTd.innerText = '';
        eachTd.appendChild(button('save', 'secondary'));
      } else if (i === tdAll.length - 1) {
        eachTd.innerText = '';
        eachTd.appendChild(button('cancel', 'secondary'));
      } else if (i === 1) { 
        select = document.createElement('select');
        selectedCategory = eachTd.innerText;
        eachTd.innerText = '';
        eachTd.append(select);

        // const categories = ['food','phone_charge', 'transportation', 'entertainment', 'rent', 'clothes', 'others']
        for (category of categories) {
          option = document.createElement('option');
          option.innerText = capitalizeFirstLetter(category);
          if (capitalizeFirstLetter(category) === selectedCategory) { //編集前のcategoryをtrueで選択
            option.selected = true;
          }
          select.append(option);
        }
      } else {
        const input = document.createElement('input');
        input.value = eachTd.innerText;
        eachTd.innerText = '';
        if (i === 0){
          input.setAttribute('type','date');
        }
        eachTd.append(input);
      };
    };
    // -----Edit中のsave/cancelボタン-----
    document.querySelector('.infoTable').addEventListener('click', (e) => { 
      if (e.target.classList.contains('saveBtn')) {    //Edit > Save Button
        const inputs = targetRow.querySelectorAll('input, select'); //select: category
        const date = inputs[0].value;
        const category = inputs[1].value;
        const amount = parseFloat(inputs[2].value).toFixed(2);
        const description = inputs[3].value;
        if (date && category && amount){
          const updatedData = { date: date, category: category, amount: amount, descripttion: description };
          localStorage.setItem(id, JSON.stringify(updatedData));
          location.reload();
        } else {
          alert('Please make sure to enter the date, category, and amount.');
        }


      }else if(e.target.classList.contains('cancelBtn')){    //Edit > Cancel Button
        const savedData = JSON.parse(localStorage.getItem(id));
        const values = [savedData.date, savedData.category, savedData.amount, savedData.description];
        for (let i = 0; i < values.length; i++) {
          tdAll[i].innerText = values[i];
        }
        // Save/Cancel button -> Edit/Delete buttonに戻す
        tdAll[4].innerHTML = '';
        tdAll[4].append(button('edit', 'light'));
        tdAll[5].innerHTML = '';
        tdAll[5].append(button('delete', 'light'));
      };
    });

  } else if (e.target.classList.contains('deleteBtn')) {  //Deleteボタン
    localStorage.removeItem(id);
    location.reload();
  };
});

