const randomUserSearchButton = document.getElementById('randomButton')
const randomCardContainer = document.querySelector('.random-card')
const buttonText = document.querySelector('.button-text')
const buttonSpinner = document.querySelector('.loader')
randomUserSearchButton.addEventListener('click', function(){
    // Here Am Showing spinner and disabling the button
    buttonSpinner.style.display = 'inline-block';
    buttonText.textContent = 'Loading...';
    randomUserSearchButton.disabled = true;

    // Here Am Fetching data
    getPerson();

    // Here Am Stopping the spinner after 5 seconds
    setTimeout(() => {
        buttonSpinner.style.display = 'none'; // Hide spinner
        buttonText.textContent = 'Choose A Random Person'; // Reset button text
        randomUserSearchButton.disabled = false; // Enable the button
    }, 5000);
})

const API = ('https://randomuser.me/api/')
async function getPerson(numberOfUsers) {
    try {
        const response = await fetch (API)
        const fetchedPeople = await response.json()
        displayUserDataOnUi(fetchedPeople.results[0])
        console.log(fetchedPeople.results[0])
    }catch(error
    ){
        console.log("SomeThing Went Wrong", error)
    }
}

function displayUserDataOnUi(user) {
    randomCardContainer.innerHTML = ''
    const cardTemplate = `
            <div class="random-card-image-container">
                <img src="${user.picture.large
                }" alt="${user.name.first}">
            </div>
            <div class="rand-card-heading-name">
                <h2>${user.name.first}</h2>
            </div>
            <div class="random-card-text">
                <p>First Name: <span id="firstName">${user.name.first}</span></p>
                <p>Last Name: <span id="lastName">${user.name.last}</span></p>
                <p>Location: <span id="street">${user.location.street.name}</span></p>
                <p>Phone: <span id="phone">${user.phone}</span></p>
                <p>Email: <span id="email">${user.email}</span></p>
            </div>
    `
    randomCardContainer.insertAdjacentHTML('beforeend', cardTemplate)
}