import envData from './env';

export const getHomePageLink = (env) => envData[env].domain || '/';
export const getEnvData = (env) => envData[env];
