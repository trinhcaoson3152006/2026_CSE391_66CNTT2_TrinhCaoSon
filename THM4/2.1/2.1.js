const form=document.getElementById("registerForm")

const fullname=document.getElementById("fullname")
const email=document.getElementById("email")
const phone=document.getElementById("phone")
const password=document.getElementById("password")
const confirm=document.getElementById("confirm")
const terms=document.getElementById("terms")

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex=/^0[0-9]{9}$/
const passRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
const nameRegex=/^[a-zA-ZÀ-ỹ\s]+$/

function showError(input,message){

let error=document.getElementById(input.id+"Error")

error.innerText=message
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

if(value===""){
showError(fullname,"Không được để trống")
return false
}

if(value.length<3){
showError(fullname,"Ít nhất 3 ký tự")
return false
}

if(!nameRegex.test(value)){
showError(fullname,"Chỉ chứa chữ cái")
return false
}

clearError(fullname)
return true

}

function validateEmail(){

let value=email.value.trim()

if(value===""){
showError(email,"Không được để trống")
return false
}

if(!emailRegex.test(value)){
showError(email,"Email không hợp lệ")
return false
}

clearError(email)
return true

}

function validatePhone(){

let value=phone.value.trim()

if(value===""){
showError(phone,"Không được để trống")
return false
}

if(!phoneRegex.test(value)){
showError(phone,"SĐT phải 10 số và bắt đầu bằng 0")
return false
}

clearError(phone)
return true

}

function validatePassword(){

let value=password.value

if(value===""){
showError(password,"Không được để trống")
return false
}

if(!passRegex.test(value)){
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

function validateGender(){

let gender=document.querySelector('input[name="gender"]:checked')

let error=document.getElementById("genderError")

if(!gender){

error.innerText="Chọn giới tính"
error.style.display="block"

return false
}

error.style.display="none"
return true

}

function validateTerms(){

let error=document.getElementById("termsError")

if(!terms.checked){

error.innerText="Phải đồng ý điều khoản"
error.style.display="block"

return false
}

error.style.display="none"
return true

}

fullname.addEventListener("blur",validateFullname)
email.addEventListener("blur",validateEmail)
phone.addEventListener("blur",validatePhone)
password.addEventListener("blur",validatePassword)
confirm.addEventListener("blur",validateConfirm)

fullname.addEventListener("input",()=>clearError(fullname))
email.addEventListener("input",()=>clearError(email))
phone.addEventListener("input",()=>clearError(phone))
password.addEventListener("input",()=>clearError(password))
confirm.addEventListener("input",()=>clearError(confirm))

form.addEventListener("submit",function(e){

e.preventDefault()

let valid=
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms()

if(valid){

form.style.display="none"

document.getElementById("successMessage").innerHTML=
`<p class="success">Đăng ký thành công! 🎉<br>Chào ${fullname.value}</p>`

}

})