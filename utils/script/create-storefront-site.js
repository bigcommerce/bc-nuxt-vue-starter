const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

module.exports.createSite = async function (channelId, siteUrl) {
  try {
    const data = {
      channel_id: channelId,
      url: siteUrl
    };

    const response = await axios.post(
      `${process.env.BC_API_URL}/stores/${process.env.STORE_HASH}/v3/channels/${channelId}/site`,
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
