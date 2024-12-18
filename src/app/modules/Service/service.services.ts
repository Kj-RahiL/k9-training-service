import AppError from '../../errors/AppError';
import { TService } from './service.interface';
import { Service } from './service.model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(404, 'Service Not found.');
  }
  return service;
};

const getAllService = async () => {
  const result = await Service.find();
  return result;
};

const updateServiceIntoDB = async (id: string, payload: TService) => {
  const isService = await Service.findById(id);

  if (!isService) {
    throw new AppError(404, 'service not found');
  }

  const service = await Service.findByIdAndUpdate(id, [{ $set: payload }], {
    new: true,
  });
  return service;
};

const deleteServiceIntoDB = async (id: string) => {
  const isService = await Service.findById(id);
  if (!isService) {
    throw new AppError(404, 'service not found');
  }
  const service = await Service.findByIdAndDelete(id);
  return service;
};

export const ServiceServices = {
  createServiceIntoDB,
  getSingleServiceFromDB,
  getAllService,
  updateServiceIntoDB,
  deleteServiceIntoDB,
};
