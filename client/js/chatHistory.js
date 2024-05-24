function createMessage(bot,content,target, loaded,role){
Maindiv=document.createElement("div")
Maindiv.className=loaded?"notification is-flex":"notification is-flex skeleton-lines"
label=document.createElement("label")
label.className=bot?'label top ml-2':'label top-right mr-2'
label.innerText=bot?`Bot(${role?role:'assistant'})`:'User'
MessageDiv=document.createElement("div")
MessageDiv.className=loaded&&bot?"new-message":"Message"
if(loaded){
  MessageDiv.innerText=content
} 
else{
  MessageDiv.innerHTML="<div></div><div></div><div></div><div></div><div></div>"
}
Maindiv.appendChild(label)
Maindiv.appendChild(MessageDiv)
target.appendChild(Maindiv)
//Todo improve the timing of the animation

//loaded&&bot?typeAnimation(content)div.Message:last-of-type:''
/*if(loaded&&bot){
  new Typed('.new-message', {
      strings: [content],
      typeSpeed: 80,
      showCursor:false
    })
document.querySelector(".new-message").classList.remove("new-message")
}*/
}
chatList=localStorage.getItem("chatHistory")!=null?JSON.parse(localStorage.getItem("chatHistory")):localStorage.setItem("chatHistory",JSON.stringify([]))
currentChat=localStorage.getItem("currentChat")!==null?parseInt(localStorage.getItem("currentChat")):0
function createChat(title){
  chatList.push({title:title,content:[]})
  localStorage.setItem("chatHistory",JSON.stringify(chatList))
}
function createChatMessage(currentChat,role,content){
  chatList[currentChat].content.push({
        role: role,
        parts: [{ text: content }],
      })
      localStorage.setItem("chatHistory",JSON.stringify(chatList)) 
}
function renderChat(currentChat){
  chatList[currentChat].content.forEach((chat)=>{
    createMessage(chat.role=="user"?false:true,chat.parts[0].text,chatBox, true)
  })
}