import { checkApiAccessPermission } from '../../utils/permission';

export const permissionMiddleware = async (req, res, next) => {
  try {
    const path = req.route.path.split('/')[1];
    const permissionString = `${req.method}_${path}`;
    checkApiAccessPermission(permissionString);
    next();
  } catch (error) {
    res.status(403).json('API permission is denied');
  }
};
