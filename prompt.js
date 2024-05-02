module.exports=(role,q)=>{
switch (role) {
   case 'Grammercorrector':
     return `${process.env.GRAMMER_CORRECTOR} ${q}`
    case 'Codegenerator':
      return `${process.env.CODE_GENERATOR} ${q}`
    case 'Contentcreator(social media)':
      return `${process.env.CONTENT_CREATOR} ${q}`
    default:
	    return q
   
}
}
