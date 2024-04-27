module.exports=function(role,q){
switch (role) {
   case 'Grammercorrector':
     return `process.env.GRAMMER_CORRECTOR ${q}`
      break;
    case 'Codegenerator':
      return `process.env.CODE_GENERATOR ${q}`
	   break;
    case 'Contentcreator(social media)':
      return `process.env.CONTENT_CREATOR ${q}`
	   break;
    default:
	  return q
   
}
}
