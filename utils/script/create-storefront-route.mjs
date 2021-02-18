import args from 'yargs';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const siteId = args.argv._[0];
const type = args.argv._[1];
const route = args.argv._[2];
axios
  .post(
    `${process.env.BC_API_URL}/stores/${process.env.STORE_HASH}/v3/sites/${siteId}/routes`,
    {
      type,
      route,
      matching: '*'
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
      console.log('There was an issue in creating route');
    }
  })
  .catch((error) => {
    console.log('ERROR: ', error.response.data);
  });
