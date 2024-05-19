disableBtn=()=>{
  sendBtn.disabled=true
}
enableBtn=()=>{
  sendBtn.disabled=false
}
function typeAnimation(text){
  el=chatBox.lastChild.lastChild
  i=0
  el.innerText=""
  setInterval(function(){
    if(i<text.length){
    el.innerHTML+=text[i]
    i++
    }
    else{
      clearInterval()
    }
  },100)
}
function startLoading(role){
  createMessage(true,"Something went wrong please try again later",chatBox,false,role)
}
function stopLoading(target){
  target.removeChild(target.lastChild)
}
