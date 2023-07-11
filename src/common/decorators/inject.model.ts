import { InjectModel } from '@nestjs/mongoose';
import { configuration } from '../config';

export const InjectModelDefault = (model: string) =>
  InjectModel(model, configuration().mongoConnectionNameDefault);
