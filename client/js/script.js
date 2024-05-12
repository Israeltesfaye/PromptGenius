/*AOS.init({
        easing: 'ease-in-out-sine'
      }); */
darkBtn.onclick=()=>{
   if(html.className=="theme-dark"){
     localStorage.setItem("theme","light")
     location.reload()
   }
     else{
       localStorage.setItem("theme","dark")
     location.reload()
     }
}
apiKey=localStorage.getItem("pgKey")?localStorage.getItem("pgKey"):undefined 
role=localStorage.getItem("pgRole")
window.onload=()=>{
  theme(html,localStorage.getItem("theme"))
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
loading.classList.add("is-loading")
sendBtn.innerHTML=""
   diva=document.createElement("div")
     diva.className="message is-link"
     diva.innerHTML=`
     <div class="message-body">${input.value}</div>
  </div>
     `
     chatBox.appendChild(diva)
   request=await fetch(`/api/${apiKey}/${role}`,{
      method:"POST",
       headers: {
          "Content-type": "application/json"},
          body:JSON.stringify({q:input.value}),
     })
	 if(request.ok){
		 loading.classList.remove('is-loading')
		 sendBtn.innerHTML='<i class="fa-solid fa-paper-plane"></i>'
     response=await request.json()
     div=document.createElement("div")
	 divc=document.createElement("div")
	 divc.className="message-body"
     div.className="message is-warning"
     divc.innerText=`
    ${response.msg}
     `
	 div.appendChild(divc)
     chatBox.appendChild(div)
	 input.value=""
	 }
	 else{
		 loading.classList.remove('is-loading')
		 sendBtn.innerHTML='<i class="fa-solid fa-paper-plane"></i>'
		 div=document.createElement("div")
	 divc=document.createElement("div")
	 divc.className="message-body"
     div.className="message is-warning"
     divc.innerText=`
    Something went wrong please try again later

     `
	 div.appendChild(divc)
	 chatBox.appendChild(div)
	 input.value=""
	 }
   
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