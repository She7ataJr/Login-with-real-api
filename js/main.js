let usernameInput=document.getElementById('usernameInput')
let emailInput=document.getElementById('emailInput')
let passwordInput=document.getElementById('passwordInput')
let repasswordInput=document.getElementById('repasswordInput')
let signupBtn = document.getElementById('signup')

let users=[]

if (JSON.parse(localStorage.getItem('personalData'))!=null){
    users=JSON.parse(localStorage.getItem('personalData'))
}


signupBtn?.addEventListener('click',function(){
        let userData = {
            name:usernameInput.value,
            email:emailInput.value,
            password:passwordInput.value,
            confirmPassword:repasswordInput.value,
        }
        users.push(userData)
        localStorage.setItem('personalData', JSON.stringify(users))
        
})

usernameInput?.addEventListener('keyup',function validateUsername(){
    let userAlert=document.getElementById('usernameAlert')
    let regex =  /[a-zA-z][a-zA-Z0-9]{3,14}[a-zA-Z]$/;
    
    // ^[a-z]{3,10}?$
    if (regex.test(usernameInput.value)==true && usernameInput !=""){
        usernameInput.classList.add('is-valid')
        usernameInput.classList.remove('is-invalid')
        userAlert.classList.replace('d-block','d-none')

    }
    else{
        usernameInput.classList.add('is-invalid')
        usernameInput.classList.remove('is-valid')
        userAlert.classList.replace('d-none', 'd-block')
           
    }
} )
emailInput?.addEventListener('keyup',function validateEmail (){
    let emailAlert=document.getElementById('emailAlert')
    let emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailregex.test(emailInput.value)==true && emailInput !=""){
        emailInput.classList.add('is-valid')
        emailInput.classList.remove('is-invalid')
        emailAlert.classList.replace('d-block','d-none')

    }
    else{
        emailInput.classList.add('is-invalid')
        emailInput.classList.remove('is-valid')
        emailAlert.classList.replace('d-none', 'd-block')
           
    }})

passwordInput?.addEventListener('keyup',function validatePassword (){
    let passowrdAlert=document.getElementById('passwordAlert')
    var passRegex = /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{4,15}$/
    if (passRegex.test(passwordInput.value)==true && passwordInput!=''){
        passwordInput.classList.add('is-valid')
        passwordInput.classList.remove('is-invalid')
        passowrdAlert.classList.replace('d-block','d-none')

    }
    else{
        passwordInput.classList.add('is-invalid')
        passwordInput.classList.remove('is-valid')
        passowrdAlert.classList.replace('d-none', 'd-block')
    }
})

repasswordInput?.addEventListener('keyup',function (){
    let repasswordAlert=document.getElementById('repasswordAlert')
    if(repasswordInput.value == passwordInput.value){
        repasswordInput.classList.add('is-valid')
        repasswordInput.classList.remove('is-invalid')
        repasswordAlert.classList.replace('d-block','d-none')
        signupBtn.removeAttribute('disabled')
    }else{
        repasswordInput.classList.add('is-invalid')
        repasswordInput.classList.remove('is-valid')
        repasswordAlert.classList.replace('d-none', 'd-block')
        signupBtn.setAttribute('disabled','')
    }
})

// draw to home
function display(){
    var cartoona = ``;
    for(var i =0;i<users.length; i++)
    {
        cartoona +=`<a class='d-block'>${users[i].email}</a>` 

    }
    document.getElementById('welcome').innerHTML = cartoona;
}
display();

// send Form to API
let elform = document.getElementById('form')
elform.addEventListener('submit',event =>{
    event.preventDefault();
    const formData = new FormData(elform)
    const data = Object.fromEntries(formData)
    
    fetch('https://goldblv.com/api/hiring/tasks/register',{
        method:'POST' ,
        headers:{ 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
})
