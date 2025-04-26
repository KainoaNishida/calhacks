import { keysToCamel } from "@/common/utils";
import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const infoRouter = express.Router();
infoRouter.use(express.json());

infoRouter.get("/", async(req, res) => {
    try{
        const resp = await axios.get(`https://api.sec-api.io/mapping/industry/Apparel Retail?token=${process.env.SEC_API}`);
        // console.log(res.data);
        const resp2 = await axios.get(`https://api.sec-api.io/mapping/industry/Footwear & Accessories?token=${process.env.SEC_API}`);
        //store in db 
        res.status(200).json(resp);
    }catch(e){
        res.status(400).send(e.message);
    }
    

})

infoRouter.get("/esg", async(req, res) => {
    const { tickers } = req.body;
    try{
        const resp = await tickers.map(async (ticker: string) => {
            const tick = await axios.get(`https://yahoo-finance127.p.rapidapi.com/esg-scores/${ticker}`,{
               headers: {
                   'x-rapidapi-key': '338f4f9391mshd24307015628e0ap134cecjsnf860ca2765d3',
                   'x-rapidapi-host': 'yahoo-finance127.p.rapidapi.com'
                 }
           });
           // console.log(tick.data);
           return tick.data;
       });
       // console.log(res);
       res.status(200).json(resp);
    }catch(e){
        res.status(400).send(e.message);
    }
    
})


export { infoRouter };