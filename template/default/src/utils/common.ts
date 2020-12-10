import host from '@/constant/http';

export function getEnv(): VUE_APP_ENV {
  return process.env.VUE_APP_ENV;
}

export function isProd() {
  return getEnv() === 'production';
}

export function isDev() {
  return getEnv() === 'development';
}

export function getAppId(): string {
  return process.env.VUE_APP_MP_APPID;
}

/**
 * 获取请求，资源域名
 */
export function getAPIRoot(namespace = 'api_gw' as HTTP_NAME_SPACE, mock = false): string {
  let space = mock ? host.mock : host[getEnv()] || host.development;
  return space[namespace];
}
