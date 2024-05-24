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
async function chatCompletion(apiKey,role,charLength,question,target){
  startLoading(role)
  request=await fetch(`/api/chat/${apiKey}/${role}/${charLength}`,{
      method:"POST",
       headers: {
          "Content-type": "application/json"},
          body:JSON.stringify({q:question, history:chatList[currentChat]. content}),
     })
     if(request.ok){
      stopLoading(target)
       response=await request.json()
       await createMessage(true,response.msg,target,true,role)
       createChatMessage(currentChat,"model",response.msg)
       enableBtn()
     }
     else{
      stopLoading(target)
      console.log(chatList[chatList.length-1])
      await createMessage(true,"Something went wrong please try again later",target,true,role)
      createChatMessage(currentChat,"model","Something went wrong please try again later")
      enableBtn() 
     }
}
