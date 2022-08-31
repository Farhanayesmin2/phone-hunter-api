
const loadPhones = async(searchText) => {
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
   /*  fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data)); */
    
}
const displayPhones = phones => {

  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = '';
// Display 20 phones 
  phones = phones.slice(0, 20);
//Display no phone found
  const noFoundPhones = document.getElementById('display-no-message');
  //const noValue = noFoundPhones.value;
  if (phones.length=== 0) {
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
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneDiv);




    })
  
    console.log(phones);
}


document.getElementById('btn-search').addEventListener('click', function () {
  

  
  
  
  const textField = document.getElementById('input-field');
  const searchText = textField.value;
  loadPhones(searchText);
  console.log(searchText);

})






//loadPhones();



