import { keysToCamel } from "@/common/utils";
import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

import { MongoClient } from 'mongodb';
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();

const infoRouter = express.Router();
infoRouter.use(express.json());

// SERP API setup
const SERP_API_URL = 'https://serpapi.com/search';
const SERP_API_KEY = process.env.SERP_API;

infoRouter.get("/", async(req, res) => {
    try{
        // const resp = await axios.get(`https://api.sec-api.io/mapping/industry/Apparel Retail?token=${process.env.SEC_API}`);
        // console.log(res.data);
        // const resp2 = await axios.get(`https://api.sec-api.io/mapping/industry/Footwear & Accessories?token=${process.env.SEC_API}`);
        // const resp3 = await axios.get(`https://api.sec-api.io/mapping/industry/Internet Retail?token=${process.env.SEC_API}`);
        const resp4 = await axios.get(`https://api.sec-api.io/mapping/industry/Apparel Manufacturing?token=${process.env.SEC_API}`);
        const resp5 = await axios.get(`https://api.sec-api.io/mapping/industry/Apparel Stores?token=${process.env.SEC_API}`);
        // const resp6 = await axios.get(`https://api.sec-api.io/mapping/industry/Tools & Accessories?token=${process.env.SEC_API}`);
        //store in db
        const total = [...resp4.data, ...resp5.data,];

        // Filter to show only ticker, name, id, and locoation
        const filtered = total.map((item) => {
            return {
                ticker: item.ticker,
                name: item.name,
                id: item.id,
                location: item.location,
            };
        });

        // const db = client.db('green_companies');
        // const collection = db.collection('company_info');

        // // 👇 INSERT INTO MONGO
        // await collection.insertMany(filtered);

        console.log("Inserted into MongoDB:", filtered.length, "documents");
        res.status(200).json(filtered);
    } catch(e){
        res.status(400).send(e.message);
    }


})

infoRouter.get('/:companyName', async (req, res) => {
    const { companyName } = req.params;
    
    try {
      // Query the MongoDB collection to find the company by its name
      await client.connect();
      const db = client.db('green_companies');
      const collection = db.collection('company_info');
      const company = await collection.findOne({ name: companyName });
      
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      // If the company is found, return the dbInfo
      res.json({ company });
    } catch (error) {
      console.error('Error fetching company info:', error);
      res.status(500).json({ message: 'Error fetching company info' });
    }
  });
  

infoRouter.get("/esg", async (req, res) => {
    try {
        await client.connect();
        const db = client.db('green_companies');
        const collection = db.collection('company_info');

        // Fetch all company documents
        // const companies = await collection.find({}).toArray();
        const companies = await collection.find({ esg: { $exists: false } }).toArray();

        // Extract the tickers
        const tickers = companies.map(company => company.ticker);

        // For each ticker, fetch ESG score
        const esgScores = await Promise.all(
            tickers.map(async (ticker) => {
                try {
                    const response = await axios.get(`https://yahoo-finance127.p.rapidapi.com/esg-scores/${ticker}`, {
                        headers: {
                            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                            'x-rapidapi-host': 'yahoo-finance127.p.rapidapi.com'
                        }
                    });
                    return { ticker, esg: response.data };
                } catch (error) {
                    console.error(`Failed for ${ticker}:`, error.message);
                    return { ticker, esg: null };
                }
            })
        );

        // Update the MongoDB collection with the ESG scores
        // const updates = esgScores
        //     .filter(score => score !== null) // Only update successful results
        //     .map(async ({ ticker, esg }) => {
        //         await collection.updateOne(
        //             { ticker: ticker },
        //             { $set: { esg: esg } }
        //         );
        //     });

        // Wait for all updates to complete
        // await Promise.all(updates);

        res.status(200).json(esgScores);

    } catch (e) {
        console.error(e);
        res.status(500).send('Server error: ' + e.message);
    } finally {
        await client.close();  // Always close your DB connection!
    }
});

infoRouter.get("/normalize-esg", async (req, res) => {
    try {
        await client.connect();
        const db = client.db('green_companies');
        const collection = db.collection('company_info');

        // Fetch all company documents
        const companies = await collection.find({}).toArray();

      // Loop through each company and normalize their ESG score
      for (let company of companies) {
        const rawEsg = company.esg.totalEsg.raw;
        const governancePerf = company.esg?.peerGovernancePerformance;
        const socialPerf = company.esg?.peerSocialPerformance;
      const environmentPerf = company.esg?.peerEnvironmentPerformance;

        const updateFields: any = {};
  
        if (rawEsg !== null && !isNaN(rawEsg)) {
          const minValue = 13.44;
          const maxValue = 28.6;

          // Normalize the raw ESG score
        //   const normalizedEsg = (rawEsg - minValue) / (maxValue - minValue);

          // Normalize peerGovernancePerformance
          if (
            governancePerf && 
            typeof governancePerf.avg === 'number' && 
            typeof governancePerf.min === 'number' && 
            typeof governancePerf.max === 'number' &&
            governancePerf.max !== governancePerf.min // prevent divide by 0
          ) {
            const normalizedGovernance = (governancePerf.avg - governancePerf.min) / (governancePerf.max - governancePerf.min);
    
            updateFields['esg.peerGovernancePerformance.normalized'] = normalizedGovernance;
          }

          // Normalize peerSocialPerformance
      if (
        socialPerf && 
        typeof socialPerf.avg === 'number' && 
        typeof socialPerf.min === 'number' && 
        typeof socialPerf.max === 'number' &&
        socialPerf.max !== socialPerf.min // prevent divide by 0
      ) {
        const normalizedSocial = (socialPerf.avg - socialPerf.min) / (socialPerf.max - socialPerf.min);
        updateFields['esg.peerSocialPerformance.normalized'] = normalizedSocial;
      }

      // Normalize peerEnvironmentPerformance
      if (
        environmentPerf && 
        typeof environmentPerf.avg === 'number' && 
        typeof environmentPerf.min === 'number' && 
        typeof environmentPerf.max === 'number' &&
        environmentPerf.max !== environmentPerf.min // prevent divide by 0
      ) {
        const normalizedEnvironment = (environmentPerf.avg - environmentPerf.min) / (environmentPerf.max - environmentPerf.min);
        updateFields['esg.peerEnvironmentPerformance.normalized'] = normalizedEnvironment;
      }

      if (Object.keys(updateFields).length > 0) {
        await collection.updateOne(
          { _id: company._id },
          { $set: updateFields }
        );
      }
  
          // Update the company document with the normalized ESG value
        // await collection.updateOne(
        //     { _id: company._id }, 
        //     { $set: { 'esg.totalEsg.normalized': normalizedEsg } }
        // );
        }
      }

      res.status(200).json({ message: "ESG scores normalized successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to normalize ESG scores", error });
    }
  });

  infoRouter.post("/search", async (req, res) => {
    const { searchTerm } = req.body;

    try {
        await client.connect();
        const db = client.db('green_companies');
        const collection = db.collection('company_info');

        // Fetch all company documents
        const companies = await collection.find({})
            .sort({ "esg.totalEsg.raw": -1 })  // Sort by raw ESG score (highest to lowest)
            .limit(10)  // Limit to 10 companies
            .toArray();

        // Iterate over each company and perform search
        const searchResults = [];

        for (let company of companies) {
          const companyName = company.name;
          const esgScore = company.esg.totalEsg.normalized;

          // Construct the query for the SERP API
          const query = `${companyName} ${searchTerm}`;


          try {
              // Make the API request to the SERP API
              const response = await axios.get(SERP_API_URL, {
              params: {
                  q: query,
                  api_key: SERP_API_KEY,
              },
              });

              // Collect the relevant data from the SERP API response
              const result = {
                  company: companyName,
                  searchTerm,
                  esgScore,
                  esg: company.esg,
                  searchResults: response.data.organic_results,  // Results from SERP API
              };

              searchResults.push(result);
          } catch (error) {
              console.error(`Error searching for ${companyName}:`, error.message);
              searchResults.push({
              company: companyName,
              searchTerm,
              error: error.message,
              });
          }
        }

        // Return the collected results
        res.status(200).json(searchResults);
    } catch (error) {
        console.error('Error fetching companies or making the search:', error.message);
        res.status(500).json({ message: 'Error fetching companies or making the search', error });
    } finally {
        await client.close();
    }
  });


export { infoRouter };