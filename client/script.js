const apiKey=localStorage.getItem("pgKey")?JSON.parse(localStorage.getItem("pgKey")).key:null
let role=localStorage.getItem("pgRole")?JSON.parse(localStorage.getItem("pgRole")).role:localStorage.setItem("pgRole",JSON.stringify({role:"Assistant"}))
let dark=document.querySelector('#dark')
darkImg=document.querySelector("#dark img")
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
window.addEventListener('DOMContentLoaded',function () {
 if(localStorage.getItem("dark")==null){localStorage.setItem("dark", JSON.stringify({
    value:false
}))
} 
function darkMode() { document.documentElement.style.setProperty('--bg', '#222');
document.documentElement.style.setProperty('--main-bg', '#111');
document.documentElement.style.setProperty('--text', 'white'); 
darkImg.src="icons8-sun-50.png"
darkImg.style.width="60%"
} 
function lightMode() { document.documentElement.style.setProperty('--bg', 'whitesmoke');
document.documentElement.style.setProperty('--main-bg', 'white');
document.documentElement.style.setProperty('--text', 'black');   
}
//set the theme on render
if(JSON.parse(localStorage.getItem("dark")).value) {   
darkMode()
}else {   
lightMode()
}     
});
window.addEventListener("load",()=>{

if (apiKey==null) {
   container.style.display="none"
   prompt.style.display="flex"
}
//dark mode toggle btn
dark.onclick=()=>{
localStorage.setItem("dark",JSON.stringify({value:!JSON.parse(localStorage.getItem("dark")).value}))
location.reload()
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
   roleDiv[0].classList.add("active")
}
arr.forEach((a)=>{
   a.onclick=()=>{
      localStorage.setItem("pgRole",JSON.stringify({role:roleType[arr.indexOf(a)].innerText.replace(/\s/g, "")}))
     
/*console.log(roleType[0].innerText.replace(/\s/g, ""))*/
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
setting.onclick=()=>{
    container.style.display="none"
    roles.style.display="grid"
}
sendBtn.onclick=async()=>{
   let res=await  fetch(`/api/${apiKey}/${role}`,{
     method:"POST",
     headers: {
        "Content-type": "application/json"},
        body:JSON.stringify({q:q.value}), 
        
   })
  if(res.ok){
   let data=await res.json()
   q.value=""
   //add a a message
   newChat=document.createElement("div")
   newChat.className='question'
   newChat.innerHTML=`
    <p> ${q.value} </p>
        <label>You</label>
   `
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
   }else{ newAnswer=document.createElement("div")
newAnswer.className="answer"
newAnswer.innerHTML=`
         <label>Bot</label>
         <p>
        Something wrong happened please try again
        </p>
`
	  chatbox.appendChild(newAnswer)
   }
   
}
if (chatbox.scrollHeight - chatbox.scrollTop === chatbox.clientHeight) {
    // Scroll is at the bottom, do nothing
  } else {
    // Scroll is not at the bottom, adjust the scroll position
    chatbox.scrollTop = chatbox.scrollHeight - chatbox.clientHeight;
  }
})
