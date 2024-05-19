function theme(el,currentState){
  if(currentState=="dark"){
    el.className="theme-dark"
    darkBtn!==null?darkBtn.innerHTML="🌞":''
  }
  else{
    el.className="theme-light"
    darkBtn.innerHTML="🌙"
    
  }
}