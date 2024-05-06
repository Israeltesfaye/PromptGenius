/*AOS.init({
        easing: 'ease-in-out-sine'
      }); */
/*darkBtn.onclick=()=>{
   isDark=!isDark
   if (isDark) {
     html.className="theme-dark"
   }else{
      html.className="not-dark"
   }
}*/
apiKey=localStorage.getItem("pgKey")?localStorage.getItem("pgKey"):undefined 
role=localStorage.getItem("pgRole")
window.onload=()=>{
  if (apiKey==null|undefined) {
     nav.style.display='none'
     chatBox.style.display='none'
     wrap.style.display='none'
     notf.classList.remove("is-invisible")
  }
}

sendBtn.onclick=async()=>{
   console.log(`http://localhost:8000/api/${apiKey}/${role}`) 
   diva=document.createElement("div")
     diva.className="message is-link"
     diva.setAttribute("data-aos","fade-down")
     diva.setAttribute("data-aos-easing","linear")
     diva.setAttribute("data-aos-duration","1500")
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
     response=await request.json()
     div=document.createElement("div")
     div.className="message is-warning"
     div.setAttribute("data-aos","fade-down")
     div.setAttribute("data-aos-easing","linear")
     div.setAttribute("data-aos-duration","1500")
     div.innerHTML=`
     <div class="message-body">${response.msg}</div>
  </div>
     `
     chatBox.appendChild(div)
   
}

settingsBtn.onclick=()=>{
   location.href="/setting.html"
}
keySubmit.onclick=()=>{
   localStorage.setItem("pgKey",keyinput.value)
   location.reload()
}
