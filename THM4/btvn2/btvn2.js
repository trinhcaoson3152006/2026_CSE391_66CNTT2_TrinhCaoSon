let currentStep=1

const progressBar=document.getElementById("progressBar")
const stepText=document.getElementById("stepText")

const fullname=document.getElementById("fullname")
const birth=document.getElementById("birth")
const email=document.getElementById("email")
const password=document.getElementById("password")
const confirm=document.getElementById("confirm")

function showStep(){

document.querySelectorAll(".step").forEach(s=>s.classList.remove("active"))

document.getElementById("step"+currentStep).classList.add("active")

stepText.innerText="Bước "+currentStep+" / 3"

progressBar.style.width=(currentStep/3*100)+"%"

if(currentStep===1){
prevBtn.style.display="none"
}else{
prevBtn.style.display="inline"
}

if(currentStep===3){
nextBtn.innerText="Hoàn tất"
}else{
nextBtn.innerText="Tiếp theo"
}

}

function showError(input,msg){

let error=document.getElementById(input.id+"Error")

error.innerText=msg
error.style.display="block"

input.classList.add("invalid")

}

function clearError(input){

let error=document.getElementById(input.id+"Error")

error.style.display="none"

input.classList.remove("invalid")
input.classList.add("valid")

}

function validateStep1(){

let ok=true

if(fullname.value.trim().length<3){
showError(fullname,"Tên ≥3 ký tự")
ok=false
}else clearError(fullname)

if(!birth.value){
showError(birth,"Chọn ngày sinh")
ok=false
}else clearError(birth)

let gender=document.querySelector('input[name="gender"]:checked')

if(!gender){
document.getElementById("genderError").innerText="Chọn giới tính"
document.getElementById("genderError").style.display="block"
ok=false
}else{
document.getElementById("genderError").style.display="none"
}

return ok

}

function validateStep2(){

let ok=true

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailRegex.test(email.value)){
showError(email,"Email không hợp lệ")
ok=false
}else clearError(email)

if(password.value.length<6){
showError(password,"Mật khẩu ≥6")
ok=false
}else clearError(password)

if(confirm.value!==password.value){
showError(confirm,"Không khớp")
ok=false
}else clearError(confirm)

return ok

}

nextBtn.onclick=function(){

if(currentStep===1){

if(!validateStep1()) return

currentStep++

}

else if(currentStep===2){

if(!validateStep2()) return

document.getElementById("summary").innerHTML=
`
Họ tên: ${fullname.value}<br>
Ngày sinh: ${birth.value}<br>
Email: ${email.value}
`

currentStep++

}

else{

document.getElementById("form").style.display="none"

document.getElementById("success").innerHTML=
"<h3>Đăng ký thành công 🎉</h3>"

}

showStep()

}

prevBtn.onclick=function(){

currentStep--

showStep()

}

showStep()