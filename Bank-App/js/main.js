// buttons
const customerTabBtn = document.querySelector('#customer-tab-btn')
const depositTabBtn = document.querySelector('#deposit-tab-btn')
const withdrawTabBtn = document.querySelector('#withdraw-tab-btn')
const transferTabBtn = document.querySelector('#transfer-tab-btn')

// modals
const clientContainer = document.querySelector('#customer-section')
const depositContainer = document.querySelector('#deposit-section')
const withdrawContainer = document.querySelector('#withdraw-section')
const transferContainer = document.querySelector('#transfer-section')


customerTabBtn.addEventListener('click', ()=>{
    clientContainer.classList.remove('hidden')
    depositContainer.classList.add('hidden')
    withdrawContainer.classList.add('hidden')
    transferContainer.classList.add('hidden')

    customerTabBtn.classList.add('active')
    depositTabBtn.classList.remove('active')
    withdrawTabBtn.classList.remove('active')
    transferTabBtn.classList.remove('active')
})

depositTabBtn.addEventListener('click', ()=>{
    depositContainer.classList.remove('hidden')
    clientContainer.classList.add('hidden')
    withdrawContainer.classList.add('hidden')
    transferContainer.classList.add('hidden')

    depositTabBtn.classList.add('active')
    customerTabBtn.classList.remove('active')
    withdrawTabBtn.classList.remove('active')
    transferTabBtn.classList.remove('active')
})

withdrawTabBtn.addEventListener('click', ()=>{
    withdrawContainer.classList.remove('hidden')
    clientContainer.classList.add('hidden')
    depositContainer.classList.add('hidden')
    transferContainer.classList.add('hidden')


    withdrawTabBtn.classList.add('active')
    depositTabBtn.classList.remove('active')
    customerTabBtn.classList.remove('active')
    transferTabBtn.classList.remove('active')
})

transferTabBtn.addEventListener('click', ()=>{
    transferContainer.classList.remove('hidden')
    clientContainer.classList.add('hidden')
    depositContainer.classList.add('hidden')
    withdrawContainer.classList.add('hidden')


    transferTabBtn.classList.add('active')
    withdrawTabBtn.classList.remove('active')
    depositTabBtn.classList.remove('active')
    customerTabBtn.classList.remove('active')
})

