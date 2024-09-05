const express = require('express');
const { Bannerbear } = require('bannerbear');

const API_KEY = 'your_api_key';
const TEMPLATE_ID = 'your_template_id';

const app = express();
const port = 3000;
app.use(express.json());

app.post('/generate-image', async (req, res) => {
  const bb = new Bannerbear(API_KEY);

  const { eventName } = req.body;
  const { location } = req.body;
  const { date_details } = req.body;
  const { time_details } = req.body;
  const { price_details } = req.body;
  const { image_url } = req.body;

  const images = await bb.create_image(
    TEMPLATE_ID,
    {
      modifications: [
        {
          name: 'title',
          text: eventName,
        },
        {
          name: 'location',
          text: location,
        },
        {
          name: 'date_details',
          text: date_details,
        },
        {
          name: 'time_details',
          text: time_details,
        },
        {
          name: 'price_details',
          text: price_details,
        },
        {
          name: 'image_placeholder',
          image_url: image_url,
        },
      ],
    },
    true
  );

  res.send(images.image_url);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
