export type TConfiguration = {
  serverPort: string;
  uploadDir: string;
  mongoUrl: { connectionName: string; uri: string }[];
  mongoConnectionNameDefault: string;
};
