import args from 'yargs';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const channelName = args.argv._[0];
axios
  .post(
    `${process.env.BC_API_URL}/stores/${process.env.STORE_HASH}/v3/channels`,
    {
      is_listable_from_ui: false,
      is_visible: true,
      name: channelName,
      status: 'active',
      type: 'storefront',
      platform: 'custom'
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': process.env.API_TOKEN
      }
    }
  )
  .then((response) => {
    if (response.status === 200) {
      console.log(response.data.data);
    } else {
      console.log('There was an issue in creating channel');
    }
  })
  .catch((error) => {
    console.log('ERROR: ', error.response.data);
  });
