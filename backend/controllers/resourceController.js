import Resource from '../models/Resource.js';
import { logActivity } from '../services/activityLogService.js';

export const createResource = async (req, res) => {
  const { title, description } = req.body;
  const resource = await Resource.create({
    title,
    description,
    createdBy: req.user._id,
  });
  await logActivity(req.user._id, 'CREATE_RESOURCE', `Created resource: ${title}`, req.ip);
  res.status(201).json(resource);
};

export const getResources = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const query = search ? { title: { $regex: search, $options: 'i' } } : {};
  const resources = await Resource.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });
  res.json(resources);
};

export const getResource = async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return res.status(404).json({ message: 'Resource not found' });
  res.json(resource);
};

export const updateResource = async (req, res) => {
  const resource = await Resource.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!resource) return res.status(404).json({ message: 'Resource not found' });
  await logActivity(req.user._id, 'UPDATE_RESOURCE', `Updated resource: ${resource.title}`, req.ip);
  res.json(resource);
};

export const deleteResource = async (req, res) => {
  const resource = await Resource.findByIdAndDelete(req.params.id);
  if (!resource) return res.status(404).json({ message: 'Resource not found' });
  await logActivity(req.user._id, 'DELETE_RESOURCE', `Deleted resource: ${resource.title}`, req.ip);
  res.json({ message: 'Resource deleted' });
};
