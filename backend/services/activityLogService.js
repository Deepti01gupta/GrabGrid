import ActivityLog from '../models/ActivityLog.js';

export const logActivity = async (userId, action, details, ip) => {
  await ActivityLog.create({ user: userId, action, details, ip });
};
