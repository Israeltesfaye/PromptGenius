currentTheme=localStorage.getItem("theme")!=null?localStorage.getItem("theme"):localStorage.setItem("theme","dark")
darkBtn.forEach((d)=>{
d.onclick=()=>{
   if(d.classList[2]=="l"){
     localStorage.setItem("theme","light")
     location.reload()
   }
     if(d.classList[2]=="d"){
       localStorage.setItem("theme","dark")
       darkBtn.innerHTML="🌞"
     location.reload()
     }
}
})
apiKey=localStorage.getItem("pgKey")?localStorage.getItem("pgKey"):undefined 
role=localStorage.getItem("pgRole")
charLength=localStorage.getItem("charLength")?localStorage.getItem("charLength"):localStorage.setItem("charLength","short")
  
  label.onclick=()=>{label.innerText=`Bot(${role==null?'assistant':role})`}
 selectb=document.querySelector(".selectb")
selectb.onclick=()=>{
   localStorage.setItem("charLength",selectb.value)
}
window.onload=()=>{
  selectb.value=localStorage.getItem("charLength")
  theme(html,currentTheme)
  
 /* deleteChatbtn=document.querySelectorAll("fa-trash") 
  deleteChatbtn.forEach((btn)=>{
    
  })*/
  label.click()
  if (apiKey==null|undefined) {
    smallNav.classList.add("is-invisible")
     chatBox.style.display='none'
     wrap.style.display='none'
     notf.classList.remove("is-invisible")
  }
  if(chatList.length>0){
  renderChat(currentChat)
  chatList.map((chat,k)=>{
    box=document.createElement("div")
    box.className="box selectChat"
    boxa=document.createElement("div")
    box.innerHTML=`<i class="fa-brands fa-rocketchat"></i>`
    boxa.className="box is-flex is-align-items-center selectChat"
    boxa.innerHTML=` <p>${chat.title}</p>
`
    box.onclick=()=>{
      localStorage.setItem("currentChat", `${k}`)
      location.reload()
    }
    boxa.onclick=()=>{
      localStorage.setItem("currentChat", `${k}`)
      location.reload()
    }
    chatListb.appendChild(box)
    chatLista.appendChild(boxa)
  })
  }
}
chatBox.addEventListener("DOMNodeInserted", function() {
// Scroll to the bottom of the chatbox
chatBox.scrollTop = chatBox.scrollHeight;
});
sendBtn.onclick=async()=>{ 
  disableBtn()
  createMessage(false,input.value,chatBox, true,role)
  createChatMessage(currentChat,"user",input.value)
	await chatCompletion(apiKey,role,charLength,input.value,chatBox)
	 input.value="" 
	 }
   

/*settingsBtn.onclick=()=>{
   location.href="/setting.html"
}*/
keySubmit.onclick=()=>{
   localStorage.setItem("pgKey",keyinput.value)
   localStorage.setItem("chatHistory",JSON.stringify([{title:"New chat", content:[
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ]}]))
   location.reload()
}
continueBtn.onclick=()=>{
  notf.classList.add("is-invisible")
  notfb.classList.remove("is-invisible")
}
okBtn.onclick=()=>{
  notfb.classList.add("is-invisible")
  notfc.classList.remove("is-invisible")
}
chooseFile=()=>{
  file.click()
}
function open(el){
  el.parentNode.parentNode.classList.add("is-invisible")
  sideNav.classList.remove("is-invisible")
}
function close(el){
  el.parentNode.parentNode.classList.add("is-invisible")
  smallNav.classList.remove("is-invisible") 
  console.log(el.classList)
}
closeBtn=document.querySelector("#close")
openBtn=document.querySelector("#open")
closeBtn.onclick=()=>{close(closeBtn)} 
openBtn.onclick=()=>{open(openBtn)} 
addnew.onclick=()=>{
  createnewChat.classList.remove("is-invisible")
}
addChatBtn.onclick=()=>{
  createChat(chatTitle.value)
  location.reload()
}
 