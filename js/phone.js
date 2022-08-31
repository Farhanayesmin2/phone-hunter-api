
const loadPhones = async(searchText,dataLimit) => {
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data,dataLimit);
   /*  fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data)); */
        console.log(data);
    
}
const displayPhones = (phones,dataLimit) => {

  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = '';

// Display 10 phones Only
  const showAll = document.getElementById('show-all');
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove('d-none');
  }
  else {
    showAll.classList.add('d-none');
  }
//Display no phone found
  const noFoundPhones = document.getElementById('display-no-message');
  //const noValue = noFoundPhones.value;
  if ( phones.length=== 0) {
    noFoundPhones.classList.remove('d-none');
  }
  else {
    noFoundPhones.classList.add('d-none');
  }
  // Display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
        <img class="px-4 pt-2" src="${phone.image}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">
            This is a longer card with supporting text below as a
            natural lead-in to additional content. This content is a
            little bit longer.
          </p>
          <button onClick="loadPhoneDetails('${phone.slug}')" class="btn btn-info shadow-lg p-2 mb-4 text-bold bg-body text-info border-info border border-3 rounded" data-bs-toggle="modal" data-bs-target="#modalDetail">Show Details</button>
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneDiv);
      
    })
     toggleSpinner(false);
    // spinner stop................... 
    //console.log(phones);
}
// process search
const processSearch = (dataLimit) => {
  // spinner start..................
  toggleSpinner(true); 
  
  const textField = document.getElementById('input-field');
  const searchText = textField.value;
  loadPhones(searchText,dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
  
  processSearch(10);

})
// Toggle spinner function...
const toggleSpinner = isLoading => {
  const loaderSpinner = document.getElementById('loader');

  if (isLoading) {
    loaderSpinner.classList.remove('d-none');
  }
  else {
    loaderSpinner.classList.add('d-none');
  }
} 
// Not the best way to load show all
document.getElementById('show-all-btn').addEventListener('click', function () {
  processSearch();
})
// search input field enter key handler
document.getElementById('input-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    processSearch(10);
 }
})

// View details

const loadPhoneDetails= async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  loadPhoneDetailsDisplay(data.data);
}
const loadPhoneDetailsDisplay = phone => {
  const modalTitle = document.getElementById('modalDetailLabel');
  modalTitle.innerText = phone.name;

  const modalBody = document.getElementById('modal-body-detail');
  modalBody.innerHTML = `
  <img src="${phone.image}" alt="">
  <p>Realse Date: ${phone.releaseDate ? phone.releaseDate: 'No Realse Date Found.' }</p>
  <h2>Phone Details: </h2>

 <p> DisplaySize:${phone.mainFeatures.displaySize} </p>
 <p> Memory: ${phone.mainFeatures.memory}  </p>
  Storage:${phone.mainFeatures.storage}
  </p>
  <h3>Other Details: </h3>
  <p>Bluetooth: ${phone.others ? phone.others.bluetooth: 'No Bluetooth information Found.' }</p>
  `;
  console.log(phone);
}


loadPhones('oppo');



