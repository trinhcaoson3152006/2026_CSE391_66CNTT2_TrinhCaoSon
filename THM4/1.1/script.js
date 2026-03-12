let students=[]

const nameInput=document.getElementById("name")
const scoreInput=document.getElementById("score")
const tbody=document.getElementById("tbody")
const addBtn=document.getElementById("addBtn")

addBtn.onclick=addStudent

function classify(score){

if(score>=8.5) return "Giỏi"
if(score>=7) return "Khá"
if(score>=5) return "Trung bình"

return "Yếu"

}

function addStudent(){

let name=nameInput.value.trim()
let score=parseFloat(scoreInput.value)

if(name===""){
alert("Họ tên không được trống")
return
}

if(isNaN(score)||score<0||score>10){
alert("Điểm phải từ 0-10")
return
}

students.push({name,score})

renderTable()

nameInput.value=""
scoreInput.value=""
nameInput.focus()

}

function renderTable(){

tbody.innerHTML=""

students.forEach((sv,i)=>{

let tr=document.createElement("tr")

if(sv.score<5){
tr.classList.add("low")
}

tr.innerHTML=`
<td>${i+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${classify(sv.score)}</td>
<td><button data-index="${i}">Xóa</button></td>
`

tbody.appendChild(tr)

})

updateStats()

}

tbody.addEventListener("click",function(e){

if(e.target.tagName==="BUTTON"){

let index=e.target.dataset.index

students.splice(index,1)

renderTable()

}

})

function updateStats(){

let total=students.length

document.getElementById("total").innerText=total

if(total===0){
document.getElementById("avg").innerText=0
return
}

let sum=students.reduce((s,sv)=>s+sv.score,0)

let avg=sum/total

document.getElementById("avg").innerText=avg.toFixed(2)

}

scoreInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){
addStudent()
}

})