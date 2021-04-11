const formDOM = {
  addClientTab: {
    accountName: document.querySelector('#accountName'),
    accountNumber: document.querySelector('#accountNumber'),
    initialDeposit: document.querySelector('#initialDeposit'),
  },
  depositTab: {
    accountName: document.querySelector('#accountName-deposit-tab'),
    accountNumber: document.querySelector('#accountNumber-deposit-tab'),
    depositAmount: document.querySelector('#deposit-amount'),
  },
  withdrawTab: {
    accountName: document.querySelector('#accountName-withdraw-tab'),
    accountNumber: document.querySelector('#accountNumber-withdraw-tab'),
    depositAmount: document.querySelector('#withdraw-amount'),
  },
  transferTab: {
    accountNameFrom: document.querySelector('#accountName-transfer-tab-from'),
    accountNumberFrom: document.querySelector(
      '#accountNumber-transfer-tab-from'
    ),
    transferAmountFrom: document.querySelector('#transfer-amount'),

    accountNameTo: document.querySelector('#accountName-transfer-tab-to'),
    accountNumberTo: document.querySelector('#accountNumber-transfer-tab-to'),
  },
  searchTab: {
    searchName: document.querySelector('#search-bar'),
  },
  // buttons
  addClientBtn: document.querySelector('#add-client-btn'),
  depositBtn: document.querySelector('#deposit-btn'),
  withdrawBtn: document.querySelector('#withdraw-btn'),
  transferBtn: document.querySelector('#transfer-btn'),
  searchBtn: document.querySelector('#search-btn'),
};

let table = document.querySelector('.table');
let tableBody = document.querySelector('.table-body');

let clients = [];

const init = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let lsItem = localStorage.getItem(localStorage.key(i));
    let client = JSON.parse(lsItem);
    clients.push(client);
  }

  for (const row of Object.values(clients)) {
    let tr = tableBody.insertRow();
    let td0 = tr.insertCell(0);
    let td1 = tr.insertCell(1);
    let td2 = tr.insertCell(2);

    tr.setAttribute(`class`, 'client-row');
    td0.innerHTML = row.name;
    td1.innerHTML = row.accountNumber;
    td2.setAttribute('id', `${row.accountNumber}`);
    td2.innerHTML = '₱ ' + row.initialDeposit;
  }
};
init();

const addClient = e => {
  // e.preventDefault();
  const newClient = {};

  let aName = formDOM.addClientTab.accountName.value.toUpperCase();
  let aNumber = formDOM.addClientTab.accountNumber.value;
  let aDepositAmount = formDOM.addClientTab.initialDeposit.value;

  // verify if required fields are not empty
  if (!aName) return alert('Account Name is required!');
  if (!aNumber) return alert('Account Number is required!');
  if (!aDepositAmount) return alert('Amount is required!');

  // error handling, if name and account number already exist
  for (const client of Object.values(clients)) {
    if (client.name === aName) return alert('Client already Exist.');
    if (client.accountNumber === aNumber)
      return alert('Account Number already in use!');
  }

  let row = tableBody.insertRow();
  let cName = row.insertCell(0);
  let cNo = row.insertCell(1);
  let cBal = row.insertCell(2);

  (newClient.name = aName.toUpperCase()),
    (newClient.accountNumber = aNumber),
    (newClient.initialDeposit = parseInt(aDepositAmount));

  cName.innerHTML = newClient.name;
  cNo.innerHTML = newClient.accountNumber;
  cBal.setAttribute('id', `${accountNumber.value}`);
  cBal.innerHTML = `₱ ${newClient.initialDeposit}`;

  let client = JSON.stringify(newClient);
  localStorage.setItem(`${aName.toUpperCase()}`, client);
};

const deposit = e => {
  // e.preventDefault()
  let aName = formDOM.depositTab.accountName.value.toUpperCase();
  let aNumber = formDOM.depositTab.accountNumber.value;
  let aDepositAmount = formDOM.depositTab.depositAmount.value;

  // verify if required fields are not empty
  if (!aName) return alert('Account Name is required!');
  if (!aNumber) return alert('Account Number is required!');
  if (!aDepositAmount) return alert('Amount is required!');

  for (const row of Object.values(clients)) {
    if (row.name === aName && row.accountNumber === aNumber) {
      row.initialDeposit += parseInt(aDepositAmount);
      let r = JSON.stringify(row);
      localStorage.setItem(`${aName}`, r);
      alert(`${aName} deposited amounting: ${aDepositAmount}`);
      return;
    }
    if (
      (row.name !== aName && row.accountNumber === aNumber) ||
      (row.name === aName && row.accountNumber !== aNumber)
    ) {
      return alert('Client account name and account number did not match.');
    }
  }
};

const withdraw = () => {
  let aName = formDOM.withdrawTab.accountName.value.toUpperCase();
  let aNumber = formDOM.withdrawTab.accountNumber.value;
  let aDepositAmount = formDOM.withdrawTab.depositAmount.value;

  // verify if required fields are not empty
  if (!aName) return alert('Account Name is required!');
  if (!aNumber) return alert('Account Number is required!');
  if (!aDepositAmount) return alert('Amount is required!');

  for (const row of Object.values(clients)) {
    if (row.name === aName && row.accountNumber === aNumber) {
      row.initialDeposit -= parseInt(aDepositAmount);
      let r = JSON.stringify(row);
      localStorage.setItem(`${row.name}`, r);
      alert(`${aName} withdraw amounting: ${aDepositAmount}`);
      return;
    }
    if (
      (row.name !== aName && row.accountNumber === aNumber) ||
      (row.name === aName && row.accountNumber !== aNumber)
    ) {
      return alert('Client account name and account number did not match.');
    }
  }
};

const transfer = e => {
  // e.preventDefault()
  let FromName = formDOM.transferTab.accountNameFrom.value.toUpperCase();
  let FromNumber = formDOM.transferTab.accountNumberFrom.value;
  let FromTransferAmount = formDOM.transferTab.transferAmountFrom.value;

  let ToName = formDOM.transferTab.accountNameTo.value.toUpperCase();
  let ToNumber = formDOM.transferTab.accountNumberTo.value;

  // verify if required fields are not empty
  if (!FromName) return alert('Sender Name is required!');
  if (!FromNumber) return alert('Sender Account Number is required!');
  if (!FromTransferAmount) return alert('Transfer Amount is required!');
  if (!ToName) return alert('Receiver Name is required!');
  if (!ToNumber) return alert('Receiver Account Number is required!');

  for (const row of Object.values(clients)) {
    if (row.name !== FromName) {
      if (row.accountNumber === FromNumber) {
        return alert('Sender details did not match!');
      }
    }
    if (row.name !== ToName) {
      if (row.accountNumber === ToNumber) {
        return alert('Receiver details did not match!');
      }
    }
    if (row.name === FromName) {
      row.initialDeposit -= parseInt(FromTransferAmount);
    }
    if (row.name === ToName) {
      row.initialDeposit += parseInt(FromTransferAmount);
    }
    let r = JSON.stringify(row);
    localStorage.setItem(`${row.name}`, r);
  }
};

const search = () => {
  let searchName = formDOM.searchTab.searchName.value.toUpperCase();

  if (searchName === '') return alert('No name is entered');

  for (const row of Object.values(clients)) {
    if (row.name === searchName) {
      alert(
        `Client Name: ${row.name}\nClient Account Number: ${row.accountNumber}\nClient Balance: ${row.initialDeposit}`
      );
    }
  }
};

formDOM.addClientBtn.addEventListener('click', addClient);
formDOM.depositBtn.addEventListener('click', deposit);
formDOM.withdrawBtn.addEventListener('click', withdraw);
formDOM.transferBtn.addEventListener('click', transfer);
formDOM.searchBtn.addEventListener('click', search);
