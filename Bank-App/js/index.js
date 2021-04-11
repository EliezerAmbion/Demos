
// buttons
const loginBtn = document.querySelector('#nav-login-btn');
const homeBtn = document.querySelector('#nav-home-btn');

// 
const formContainer = document.querySelector('.form-container')
const homeContainer = document.querySelector('.home-container')

loginBtn.addEventListener('click', ()=>{
    formContainer.classList.remove('hidden')
    homeContainer.classList.add('hidden')
})

homeBtn.addEventListener('click', ()=>{
    formContainer.classList.add('hidden')
    homeContainer.classList.remove('hidden')
})
