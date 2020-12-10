type host_namespace = {
  [propName in HTTP_NAME_SPACE]: string;
};

type HOST = {
  [propName in VUE_APP_ENV]: host_namespace;
};

const UUID: string = 'uuid-uuid-uuid';
const request: string = 'request'; //
const LOG: string = 'log';

const CDN = {
  MOCK: `https://static.qa.${request}.com`,
  DEVELOPMENT: `https://static.qa.${request}.com`,
  PREVIEW: `https://static.pre.${request}.com`,
  PRODUCTION: `https://static.${request}.com`
};

const host = {
  mock: {
    api_gw: `http://mock.qa.${request}.com`,
    cdn: CDN.MOCK,
    config: `${CDN.MOCK}/dms/${UUID}.json`,
    log: `https://${LOG}.qa.${request}.com/log.gif`
  },
  development: {
    api_gw: `https://apigw.qa.${request}.com`,
    cdn: CDN.DEVELOPMENT,
    config: `${CDN.DEVELOPMENT}/dms/${UUID}.json`,
    log: `https://${LOG}.qa.${request}.com/log.gif`
  },
  preview: {
    api_gw: `https://apigw.pre.${request}.com`,
    cdn: CDN.PREVIEW,
    config: `${CDN.PREVIEW}/dms/${UUID}.json`,
    log: `https://${LOG}.qa.${request}.com/log.gif`
  },
  production: {
    api_gw: `https://apigw.${request}.com`,
    cdn: CDN.PRODUCTION,
    config: `${CDN.PRODUCTION}/dms/${UUID}.json`,
    log: `https://${LOG}.${request}.com/log.gif`
  }
} as HOST;

export default host;
