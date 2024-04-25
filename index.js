require("dotenv").config()
const cors=require("cors")
const OpenAIApi=require("openai")
const express=require("express")
const app=express()
const port=process.env.PORT || 8000
const promptChooser=require("./prompt.js")

app.use(cors())
app.use(express.static("client"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.post("/api/:key/:role/",async(req,res)=>{

const openai=new OpenAIApi.OpenAI({apiKey:req.params.key})
try{
chatCompletion=await openai.chat.completions.create({
	model:'gpt-3.5-turbo',
	messages:[
		{
			role:'user',
			content:promptChooser(req.params.role,req.body.q)
		}
	]
/*	messages:[
		{
			role:'user',
			content:"what is the capital city of Ethiopia?"
		}, 
		{
			role:'user',
			content:"what is its population?"
		}
		
		
	]*/
})	
res.json({msg:chatCompletion.choices[0].message.content})
console.log(chatCompletion.choices[0].message.content)
}
catch(err){
  console.log(err)
    res.sendStatus(400)
}

})

app.listen(port,console.log("server is running"))
