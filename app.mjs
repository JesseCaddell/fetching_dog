import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/breeds', async (req, res) => {
    try {
        const response = await fetch('https://dogapi.dog/api/v2/breeds');

        if (!response.ok) {
            throw new Error('Network response was not okay');
        }

        const responseData = await response.json();
        const data = responseData.data;

        //check if data is an array
        if (!Array.isArray(data)) {
            throw new Error('Response data is not an array');
        }

        //extract breed names from data
        const breedNames = data.map((breed) => breed.attributes.name);

        res.json(breedNames);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/breeds/:id', async (req, res) => {
    const breedId = req.params.id;

    try {
        const response = await fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`);

        if (!response.ok) {
            throw new Error('Network response was not okay');
        }

        const breedData = await response.json();
        //console.log('Received breed data:', breedData);
        // removed error handling for possible change in data structure. Need to revist.
        const breedName = breedData.data.attributes.name;
        const breedDescription = breedData.data.attributes.description;
        const breedHypoallergenic = breedData.data.attributes.hypoallergenic;

        res.json({
            name: breedName,
            description: breedDescription,
            hypoallergenic: breedHypoallergenic,
        });


    } catch (error) {
        console.error('Error:', error)
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});