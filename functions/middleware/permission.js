const { checkApiAccessPermission } = require('../../utils/permission');

const permission = (func) => (a, b) => {
  const handler = {
    apply: (target, thisArg, args) => {
      const { path, httpMethod } = args[0];
      const routePath = path.replace('/.netlify/functions/', '');
      const permString = `${httpMethod}_${routePath}`;
      const perm = checkApiAccessPermission(permString);
      if (!perm) {
        return {
          statusCode: 403,
          body: JSON.stringify({
            message: `This API Permission Denied`
          })
        };
      }

      return target(args[0], args[1]);
    }
  };

  const proxy = new Proxy(func, handler);

  return proxy.apply(this, [a, b]);
};

module.exports = permission;
