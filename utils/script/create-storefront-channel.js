const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

module.exports.createChannel = async function (name, appId, sections) {
  try {
    const data = {
      is_listable_from_ui: false,
      is_visible: true,
      name,
      status: 'active',
      type: 'storefront',
      platform: 'custom'
    };
    const configMeta = { app: {} };
    const secs = sections ? JSON.parse(sections) : null;

    if (appId || secs) {
      configMeta.app.id = appId || null;
      configMeta.app.sections = secs || null;
      data.config_meta = configMeta;
    }

    const response = await axios.post(
      `${process.env.BC_API_URL}/stores/${process.env.STORE_HASH}/v3/channels`,
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
