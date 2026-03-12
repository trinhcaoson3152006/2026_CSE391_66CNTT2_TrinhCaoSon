const fullname=document.getElementById("fullname")
const email=document.getElementById("email")
const phone=document.getElementById("phone")
const password=document.getElementById("password")
const confirm=document.getElementById("confirm")
const togglePass=document.getElementById("togglePass")
const form=document.getElementById("registerForm")

const strengthBar=document.getElementById("strengthBar")

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex=/^0[0-9]{9}$/
const passRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
const nameRegex=/^[a-zA-ZÀ-ỹ\s]+$/

function showError(input,msg){

let error=document.getElementById(input.id+"Error")

error.innerText=msg
error.style.display="block"

input.classList.add("invalid")
input.classList.remove("valid")

}

function clearError(input){

let error=document.getElementById(input.id+"Error")

error.style.display="none"

input.classList.remove("invalid")
input.classList.add("valid")

}

function validateFullname(){

let value=fullname.value.trim()

if(value===""||value.length<3||!nameRegex.test(value)){
showError(fullname,"Tên không hợp lệ")
return false
}

clearError(fullname)
return true

}

function validateEmail(){

if(!emailRegex.test(email.value)){
showError(email,"Email không hợp lệ")
return false
}

clearError(email)
return true

}

function validatePhone(){

if(!phoneRegex.test(phone.value)){
showError(phone,"SĐT không hợp lệ")
return false
}

clearError(phone)
return true

}

function validatePassword(){

if(!passRegex.test(password.value)){
showError(password,"≥8 ký tự, có hoa, thường, số")
return false
}

clearError(password)
return true

}

function validateConfirm(){

if(confirm.value!==password.value){
showError(confirm,"Mật khẩu không khớp")
return false
}

clearError(confirm)
return true

}

fullname.addEventListener("input",function(){

document.getElementById("nameCount").innerText=fullname.value.length

})

password.addEventListener("input",function(){

let value=password.value

let score=0

if(value.length>=8) score++
if(/[A-Z]/.test(value)) score++
if(/[0-9]/.test(value)) score++

if(score===1){

strengthBar.style.width="33%"
strengthBar.style.background="red"

}

else if(score===2){

strengthBar.style.width="66%"
strengthBar.style.background="orange"

}

else if(score===3){

strengthBar.style.width="100%"
strengthBar.style.background="green"

}

else{

strengthBar.style.width="0%"

}

})

togglePass.onclick=function(){

if(password.type==="password"){
password.type="text"
}else{
password.type="password"
}

}

form.addEventListener("submit",function(e){

e.preventDefault()

let valid=
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm()

if(valid){

form.style.display="none"

document.getElementById("success").innerHTML=
"<h3>Đăng ký thành công 🎉</h3>"

}

})