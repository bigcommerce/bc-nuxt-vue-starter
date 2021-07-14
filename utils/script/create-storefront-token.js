const moment = require('moment');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

module.exports.createStoreFrontToken = async function (channelId, hostUrl) {
  try {
    const data = {
      channel_id: channelId,
      allowed_cors_origins: [hostUrl],
      expires_at: moment('2025').unix()
    };

    const response = await axios.post(
      `${process.env.BC_API_URL}/stores/${process.env.STORE_HASH}/v3/storefront/api-token`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': process.env.API_TOKEN
        }
      }
    );
    console.log(response.data);
    return '===========SUCCESS===========';
  } catch (err) {
    const error = err?.response?.data ?? err;
    console.log(error);
    return '===========FAILED===========';
  }
};
require('make-runnable/custom')({
  printOutputFrame: false
});
