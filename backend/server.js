import express, { response } from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
import cors from "cors";
const app = express();
const port = process.env.PORT || 5002;


app.use(cors({
  origin:"http://localhost:5173",
}))
app.use(express.json());

app.get("/", (req, res) => {
  try{
    res.json({ message: "hello" });
  }catch (error) {
    console.log(error);
    res.json({error:"there is error"})
  }
});

app.post("/api", async (req, res) =>  {
  try{
    const {from,to,amount} = req.body;
    const url = `${process.env.API_URL}/${process.env.API_KEY}/pair/${from}/${to}/${amount}`
    console.log(url);
    
    const response = await axios.get(url)
    if (response.data && response.data.result === "success") {
      res.json({
        base: from,
        target: to,
        conversionRate: response.data.conversion_rate,
        convertedAmount: response.data.conversion_result,
      });
    } else {
      res.json({
        message: "Error converting currency",
        details: response.data,
      });
    }
  }catch (error) {
    console.log(error);
    res.json({error:"there is error"})
  }
});



app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
