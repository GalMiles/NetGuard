//import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import Clarifai from 'clarifai';

export default async (req, res) => {
    const { url } = req.body;

    try {
        const response = await fetch(url);
        const html = await response.text();

        // Load the HTML into cheerio
        const $ = cheerio.load(html);
        // Extract image URLs
        const imageUrls = [];
        $('img').each((index, image) => {
            const src = $(image).attr('src');
            if (src) {
                // Convert relative URLs to absolute if necessary
                const absoluteSrc = src.startsWith('http') ? src : new URL(src, url).toString();
                imageUrls.push(absoluteSrc);
                console.log("test");
            }
        });

        console.log(imageUrls);

        const app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY });
        const analysisResults = [];
        const finalResult = {
            "safe": 1.0,
            "drug": 0.0,
            "explicit": 0.0,
            "gore": 0.0,
            "suggestive": 0.0
        }

        console.log("test2");
        for (const imageUrl of imageUrls) {
            try {
                const response = await app.models.predict(Clarifai.MODERATION_MODEL, imageUrl);
                console.log("test3");
                // Assuming you want to collect some data from the response
                const concepts = response.outputs[0].data.concepts.map(concept => ({
                    name: concept.name,
                    value: concept.value
                }));
                // console.log(concepts);
                analysisResults.push({ imageUrl, concepts });
            } catch (error) {
                console.error('Clarifai error:', error.message);
                // Consider how to handle individual errors; maybe collect them or ignore
                analysisResults.push({ imageUrl, error: error.message });
            }
        }

        // Finding the worst values
        console.log(analysisResults);
        const obj = {};
        for(const concept of analysisResults) {
            //console.log(analysis);
            if(concept?.error){
                continue;
            }
            for(const con of concept.concepts){
                const name = con.name;
                if(name === 'safe'){
                    if(con.value < finalResult.safe){
                        finalResult.safe = con.value
                    }
                }
                else{
                    if(con.value > finalResult[name]){
                        finalResult[name] = con.value
                    }
                }
            }
               
        }

        // Send a single response with all analysis results
        res.status(200).json({ finalResult });
    } catch (error) {
        console.error('Error scraping images:', error);
        res.status(500).json({ error: 'Failed to scrape images or analyze.' });
    }
}