require("dotenv").config()
const OpenAIApi=require("openai")
const express=require("express")
const app=express()
const port=process.env.PORT || 8000
const promptChooser=require("./prompt.js")

app.get("/:key/:role/:q",async(req,res)=>{
console.log(req.params.key)
const openai=new OpenAIApi.OpenAI({apiKey:req.params.key})
chatCompletion=await openai.chat.completions.create({
	model:'gpt-3.5-turbo',
	messages:[
		{
			role:'user',
			content:promptChooser(req.params.role,req.params.q)
		}
	]
})
	res.json({msg:chatCompletion.choices[0].message.content})

})

app.listen(port,console.log("server is running"))
