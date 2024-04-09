module.exports=function(role,q){
switch (role) {
   case 'Grammercorrector':
     return `check and correct grammer,sentence,spelling issues from the following words/sentences and return the corrected one: ${q}`
      break;
    case 'Codegenerator':
      return `please responde with the code snippet from the following prompt: ${q}`
      case 'Contentcreator(social media)':
      return `please responde with with content/idea for this prompt its for social media ${q}`
    default:
	return q
   
}
}
