import args from 'yargs';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const channelId = args.argv._[0];
const siteUrl = args.argv._[1];
axios
  .post(
    `${process.env.BC_API_URL}/stores/${process.env.STORE_HASH}/v3/channels/${channelId}/site`,
    {
      channel_id: channelId,
      url: siteUrl
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
      console.log('There was an issue in creating site');
    }
  })
  .catch((error) => {
    console.log('ERROR: ', error.response.data);
  });
