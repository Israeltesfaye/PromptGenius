function createMessage(bot,content,target, loaded,role){
Maindiv=document.createElement("div")
Maindiv.className=loaded?"notification is-flex":"notification is-flex skeleton-lines"
label=document.createElement("label")
label.className=bot?'label top ml-2':'label top-right mr-2'
label.innerText=bot?`Bot(${role})`:'User'
MessageDiv=document.createElement("div")
MessageDiv.className="Message"
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

//loaded&&bot?typeAnimation(content):''
/*loaded&&bot? new Typed('div.Message:last-of-type', {
      strings: [content],
      typeSpeed: 50,
    }):''
document.querySelector(".new-message").classList.remove(".new-message")*/
}
async function chatCompletion(apiKey,role,charLength,question,target){
  startLoading(role)
  request=await fetch(`/api/${apiKey}/${role}/${charLength}`,{
      method:"POST",
       headers: {
          "Content-type": "application/json"},
          body:JSON.stringify({q:question}),
     })
     if(request.ok){
      stopLoading(target)
       response=await request.json()
       await createMessage(true,response.msg,target,true,role)
       enableBtn()
     }
     else{
      stopLoading(target)
      await createMessage(true,"Something went wrong please try again later",target,true,role)
      enableBtn() 
     }
}
