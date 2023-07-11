import { DynamicModule } from '@nestjs/common';
import {
  ModelDefinition,
  MongooseModule,
  SchemaFactory,
} from '@nestjs/mongoose';
import { configuration } from 'common';

export type SchemaPortal = {
  name: string;
  collection: string;
  schema: SchemaFactory;
};

export const createConnectionMongoose = () => {
  const connections = [];
  for (const connectionInfo of configuration().mongoUrl) {
    connections.push(
      MongooseModule.forRootAsync({
        connectionName: connectionInfo.connectionName,
        useFactory: async () => ({ uri: connectionInfo.uri }),
      }),
    );
  }

  return connections;
};

export const addMongoToModule = (
  schema: ModelDefinition[],
  connectionName: string = configuration().mongoConnectionNameDefault,
): DynamicModule => {
  return MongooseModule.forFeature(schema, connectionName);
};

export const getConnectionName = () =>
  configuration().mongoConnectionNameDefault;
