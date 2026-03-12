let students=[]
let filteredStudents=[]

let sortAsc=true

const nameInput=document.getElementById("name")
const scoreInput=document.getElementById("score")
const tbody=document.getElementById("tbody")
const addBtn=document.getElementById("addBtn")

const searchInput=document.getElementById("search")
const filterSelect=document.getElementById("filter")
const scoreHeader=document.getElementById("scoreHeader")

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

nameInput.value=""
scoreInput.value=""
nameInput.focus()

applyFilters()

}

function applyFilters(){

let keyword=searchInput.value.toLowerCase()
let type=filterSelect.value

filteredStudents=students.filter(sv=>{

let matchName=sv.name.toLowerCase().includes(keyword)

let matchType=true

if(type!=="all"){
matchType=classify(sv.score)===type
}

return matchName && matchType

})

filteredStudents.sort((a,b)=>{

return sortAsc ? a.score-b.score : b.score-a.score

})

renderTable()

}

function renderTable(){

tbody.innerHTML=""

if(filteredStudents.length===0){

document.getElementById("noResult").style.display="block"

}else{

document.getElementById("noResult").style.display="none"

}

filteredStudents.forEach((sv,i)=>{

let tr=document.createElement("tr")

if(sv.score<5){
tr.classList.add("low")
}

let index=students.indexOf(sv)

tr.innerHTML=`
<td>${i+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${classify(sv.score)}</td>
<td><button data-index="${index}">Xóa</button></td>
`

tbody.appendChild(tr)

})

updateStats()

}

tbody.addEventListener("click",function(e){

if(e.target.tagName==="BUTTON"){

let index=e.target.dataset.index

students.splice(index,1)

applyFilters()

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

document.getElementById("avg").innerText=(sum/total).toFixed(2)

}

scoreInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){
addStudent()
}

})

searchInput.addEventListener("input",applyFilters)

filterSelect.addEventListener("change",applyFilters)

scoreHeader.addEventListener("click",function(){

sortAsc=!sortAsc

scoreHeader.innerText=sortAsc ? "Điểm ▲" : "Điểm ▼"

applyFilters()

})