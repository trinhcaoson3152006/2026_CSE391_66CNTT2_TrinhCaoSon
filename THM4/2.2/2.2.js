const prices={
"Áo":150000,
"Quần":200000,
"Giày":500000
}

const form=document.getElementById("orderForm")

const product=document.getElementById("product")
const quantity=document.getElementById("quantity")
const date=document.getElementById("date")
const address=document.getElementById("address")
const note=document.getElementById("note")

const total=document.getElementById("total")

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

function validateProduct(){

if(product.value===""){
showError(product,"Chọn sản phẩm")
return false
}

clearError(product)
return true

}

function validateQuantity(){

let q=parseInt(quantity.value)

if(isNaN(q)||q<1||q>99){
showError(quantity,"Số lượng 1-99")
return false
}

clearError(quantity)
return true

}

function validateDate(){

let d=new Date(date.value)
let today=new Date()

today.setHours(0,0,0,0)

let max=new Date()
max.setDate(today.getDate()+30)

if(!date.value){
showError(date,"Chọn ngày giao")
return false
}

if(d<today||d>max){
showError(date,"Ngày trong 30 ngày tới")
return false
}

clearError(date)
return true

}

function validateAddress(){

let value=address.value.trim()

if(value.length<10){
showError(address,"Ít nhất 10 ký tự")
return false
}

clearError(address)
return true

}

function validateNote(){

let length=note.value.length

if(length>200){
document.getElementById("noteError").innerText="Tối đa 200 ký tự"
document.getElementById("noteError").style.display="block"
return false
}

document.getElementById("noteError").style.display="none"
return true

}

function validatePayment(){

let p=document.querySelector('input[name="payment"]:checked')

let error=document.getElementById("paymentError")

if(!p){
error.innerText="Chọn phương thức thanh toán"
error.style.display="block"
return false
}

error.style.display="none"
return true

}

product.addEventListener("blur",validateProduct)
quantity.addEventListener("blur",validateQuantity)
date.addEventListener("blur",validateDate)
address.addEventListener("blur",validateAddress)

product.addEventListener("change",updateTotal)
quantity.addEventListener("input",updateTotal)

note.addEventListener("input",function(){

let len=note.value.length

document.getElementById("count").innerText=len

if(len>200){
document.getElementById("count").style.color="red"
}else{
document.getElementById("count").style.color="black"
}

})

function updateTotal(){

let price=prices[product.value]||0
let q=parseInt(quantity.value)||0

let sum=price*q

total.innerText=Number(sum).toLocaleString("vi-VN")

}

form.addEventListener("submit",function(e){

e.preventDefault()

let valid=
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePayment()

if(valid){

let price=prices[product.value]
let q=quantity.value
let sum=price*q

document.getElementById("summary").innerHTML=
`
Sản phẩm: ${product.value}<br>
Số lượng: ${q}<br>
Tổng tiền: ${Number(sum).toLocaleString("vi-VN")} VNĐ<br>
Ngày giao: ${date.value}
`

document.getElementById("confirmBox").style.display="block"

}

})

document.getElementById("confirmBtn").onclick=function(){

document.getElementById("confirmBox").style.display="none"
form.style.display="none"

document.getElementById("success").innerHTML=
"<h3>Đặt hàng thành công 🎉</h3>"

}

document.getElementById("cancelBtn").onclick=function(){

document.getElementById("confirmBox").style.display="none"

}