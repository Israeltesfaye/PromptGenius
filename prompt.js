module.exports=(role,q)=>{
switch (role) {
   case 'Grammercorrector':
     return `${process.env.GRAMMER_CORRECTOR} ${q}`
    case 'Codegenerator':
      return `${process.env.CODE_GENERATOR} ${q}`
    case 'Contentcreator(social media)':
      return `${process.env.CONTENT_CREATOR} ${q}`
    case 'sysadmin':
      return `${process.env.SYSTEM_ADMINSTRATOR} ${q}`
    case 'gamedev':
      return `${process.env.GAME_DEVELOPER} ${q}`
    default:
	    return q
   
}
}
