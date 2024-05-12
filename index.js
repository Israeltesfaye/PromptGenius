require("dotenv").config()
const cors=require("cors")
const express=require("express")
const app=express()
const port=process.env.PORT || 8000
const promptChooser=require("./prompt.js")
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(cors())
app.use(express.static("client"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.post("/api/:key/:role/:charLength",async(req,res)=>{
  pickChar=()=>{
    switch (req.params.charLength) {
      case "short":
        return 100
        break;
      case "medium":
          return 200
          break;
      case "long":
        return 400
        break;
      default:
        return 100
        break;
    }
  }
  const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens:pickChar(),
    temperature: 0.9,
  topP: 0.1,
  topK: 16,
  };
const genAI = new GoogleGenerativeAI(req.params.key);
try{
const model = genAI.getGenerativeModel({ model: "gemini-pro",generationConfig});

  const prompt = promptChooser(req.params.role,req.body.q)
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  res.json({msg:text})
}
catch(err){
    res.sendStatus(400)
    console.log(err)
}

})

app.listen(port,console.log("server is running on port "+port))
