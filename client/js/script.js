currentTheme=localStorage.getItem("theme")!=null?localStorage.getItem("theme"):localStorage.setItem("theme","dark")
darkBtn.onclick=()=>{
   if(html.className=="theme-dark"){
     localStorage.setItem("theme","light")
     location.reload()
   }
     else{
       localStorage.setItem("theme","dark")
       darkBtn.innerHTML="🌞"
     location.reload()
     }
}
apiKey=localStorage.getItem("pgKey")?localStorage.getItem("pgKey"):undefined 
role=localStorage.getItem("pgRole")
charLength=localStorage.getItem("charLength")?localStorage.getItem("charLength"):localStorage.setItem("charLength","short")
  
  label.onclick=()=>{label.innerText=`Bot(${role})`}
window.onload=()=>{
  theme(html,currentTheme)
  label.click()
  if (apiKey==null|undefined) {
     nav.style.display='none'
     chatBox.style.display='none'
     wrap.style.display='none'
     notf.classList.remove("is-invisible")
  }
}
chatBox.addEventListener("DOMNodeInserted", function() {
// Scroll to the bottom of the chatbox
chatBox.scrollTop = chatBox.scrollHeight;
});
sendBtn.onclick=async()=>{ 
  disableBtn()
  createMessage(false,input.value,chatBox, true,role) 
	await chatCompletion(apiKey,role,charLength,input.value,chatBox)
	 input.value="" 
	 }
   

settingsBtn.onclick=()=>{
   location.href="/setting.html"
}
keySubmit.onclick=()=>{
   localStorage.setItem("pgKey",keyinput.value)
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