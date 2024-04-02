module.exports=function(role,q){
switch (role) {
   case 'Grammercorrector':
     return `check and correct grammer,sentence,spelling issues from the following words/sentences: ${q}`
      break;
    case 'Codegenerator':
      return `please responde with the code snippet from the following prompt: ${q}`
    default:
	return q
   
}
}
