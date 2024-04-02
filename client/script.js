console.log("bot")
const apiKey=localStorage.getItem("pgKey")?JSON.parse(localStorage.getItem("pgKey")).key:null
let role=localStorage.getItem("pgRole")?JSON.parse(localStorage.getItem("pgRole")).role:localStorage.setItem("pgRole",JSON.stringify({role:"Assistant"}))
let q=document.querySelector('#q')
let prompt=document.querySelector(".prompt")
let container=document.querySelector(".container")
let roles=document.querySelector(".roles")
let roleType=document.querySelectorAll(".role-type")
let roleDiv=document.querySelectorAll(".role")
let keySubmit=document.getElementById("key-submit")
let keyInput=document.getElementById("key-input")
let sendBtn=document.getElementById("send")
let chatbox=document.querySelector(".chat-box")
let continueBtn=document.querySelector('.continue')
window.addEventListener("load",()=>{
if (apiKey==null) {
   container.style.display="none"
   prompt.style.display="flex"
}
roleType.forEach((rolea)=>{
         if (rolea.innerText==role) {
            rolea.parentNode.classList.add("active")
         }
      
})
arr=[]
roleDiv.forEach((r)=>{
   arr.push(r)
})
if(document.querySelector('active')==null){
   roleDiv[4].classList.add("active")
}
arr.forEach((a)=>{
   a.onclick=()=>{
      localStorage.setItem("pgRole",JSON.stringify({role:roleType[arr.indexOf(a)].innerText}))
      document.querySelector(".active").classList.remove("active")
      roleDiv[arr.indexOf(a)].classList.add("active")
   }
})
keySubmit.onclick=()=>{
   localStorage.setItem('pgKey',JSON.stringify({key:keyInput.value}))
   prompt.style.display='none'
   //finish the tour
   container.style.display="none"
   roles.style.display='grid'
}
continueBtn.onclick=()=>{
   roles.style.display='none'
   container.style.display='flex'
}
alert(q.value)
sendBtn.onclick=async()=>{
   alert(apiKey)
	alert(q.value)
   let res=await  fetch("http://127.0.0.1:8000/api/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/Codegenrator",{
     method:"POST",
     headers: {
        "Content-type": "application/json"},
        body:JSON.stringify({q:q.value}), 
        
   })
  /*if(res.ok){*/
   let data=await res.json()
   //add a a message
   newChat=document.createElement("div")
   newChat.className='question'
   newChat.innerHTML=`
    <p> ${q.value} </p>
        <label>You</label>
   `
   alert(data.msg)
for(a in data.msg){console.log(a)}
   chatbox.appendChild(newChat)
 newAnswer=document.createElement("div")
newAnswer.className="answer"
newAnswer.innerHTML=`
         <label>Bot</label>
         <p>
        ${data.msg}
        </p>
`
	  chatbox.appendChild(newAnswer)
   /*}*/
   
}
if (chatbox.scrollHeight - chatbox.scrollTop === chatbox.clientHeight) {
    // Scroll is at the bottom, do nothing
  } else {
    // Scroll is not at the bottom, adjust the scroll position
    chatbox.scrollTop = chatbox.scrollHeight - chatbox.clientHeight;
  }
})
