export default function (context) {
  const {
    $axios,
    app: { $toast }
  } = context;
  $axios.onRequest((config) => {
    console.log('Making request to ' + `: ${config.baseURL}${config.url}`);
    if (
      !config.url.startsWith('http://') &&
      !config.url.startsWith('https://') &&
      config.headers.common &&
      !config.url.includes('api')
    ) {
      config.headers.Authorization = `Bearer ${process.env.storeFrontApiToken}`;
      config.headers['Content-Type'] = 'application/json';
    } else {
      config.headers['Content-Type'] = 'application/json';
      config.headers.Accept = 'application/json';
      config.headers['X-Auth-Token'] = `${process.env.apiToken}`;
    }
  });

  $axios.onError(async (error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      $toast.error('Token is expired or incorrect.');
    } else if (code === 403) {
      $toast.error('You do not have permission to do that.');
    } else {
      const errorMessage =
        error?.response?.data?.error ??
        error?.response?.message ??
        error?.response?.error?.message ??
        error?.response?.data?.message ??
        error?.response?.data?.errors?.variant;
      if (errorMessage) {
        $toast.error(errorMessage);
      }
      console.log(error);
    }
    throw error;
  });
}
