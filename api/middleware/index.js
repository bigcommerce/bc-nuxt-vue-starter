import { checkApiAccessPermission } from '../../utils/permission';

export const permissionMiddleware = async (req, res, next) => {
  try {
    const path = req.route.path.split('/')[1];
    const permissionString = `${req.method}_${path}`;
    if (checkApiAccessPermission(permissionString)) {
      next();
    } else {
      return res.json({
        message: `${permissionString} API Permission Denied`,
        body: null,
        status: false
      });
    }
  } catch (error) {
    return res.json({
      message: 'Something went wrong',
      body: error,
      status: false
    });
  }
};
