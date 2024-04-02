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

console.log(req.body.q)
console.log(req.params.key)
const openai=new OpenAIApi.OpenAI({apiKey:req.params.key})
chatCompletion=await openai.chat.completions.create({
	model:'gpt-3.5-turbo',
	messages:[
		{
			role:'user',
			content:promptChooser(req.params.role,req.body.q)
		}
	]
})
	res.json({msg:chatCompletion.choices[0].message.content})
console.log(chatCompletion.choices[0].message.content)
})

app.listen(port,console.log("server is running"))
