import { getAPIRoot } from '../utils/common';
import { toRawType, isDef } from '../utils/util';
import { HTTP_LINK } from '../utils/regex';
import { showToast, showLoading, hideLoading } from '../utils/toast';

interface IHooks {
  beforeHooks?: Function;
  successHooks?: Function;
  errorHooks?: Function;
  failHooks?: Function;
  completeHooks?: Function;
}

interface IConfig {
  noToast?: boolean;
  noLoading?: boolean;
  hooks?: IHooks;
  authRepeat?: number;
}

interface IRequestOptions extends UniApp.RequestOptions {
  params?: AnyObject;
  config?: IConfig;
}

const URL_PREFIX = getAPIRoot();
console.log('URL_PREFIX = ', URL_PREFIX);

function resolveParams(params: AnyObject = {}) {
  let paramArr = [];

  for (let key in params) {
    if (isDef(params[key])) {
      paramArr.push(key + '=' + params[key]);
    }
  }
  let paramsStr = paramArr.join('&');
  return paramsStr;
}

function resolverUrl(url: string, params?: AnyObject): string {
  let paramsStr = resolveParams(params);
  return (HTTP_LINK.test(url) ? url : URL_PREFIX + url) + (paramsStr ? '?' + paramsStr : '');
}

function setToken(header: AnyObject, token: string) {
  token && (header.Cookie = `user_token=${token}`);
}

//  根据业务调整
function isOk(data: string | AnyObject | ArrayBuffer) {
  // @ts-ignore
  return data.ok;
}
function resolveHeader(header: AnyObject) {
  let h = { ...header };
  // 根据业务获取token
  setToken(h, 'token');
  return h;
}

// ---------------

function request(options: IRequestOptions) {
  let { config, ...requestOptions } = options;
  requestOptions.url = resolverUrl(requestOptions.url, requestOptions.params);
  requestOptions.header = resolveHeader(requestOptions.header);
  return doRequest(requestOptions, config || {});
}

function processHooksCreator(hooks?: IHooks) {
  if (hooks) {
    return (name: string, args: unknown) => {
      // @ts-ignore
      let fun = hooks[name];
      toRawType(fun) === 'Function' && fun.apply(null, args);
    };
  }
  return () => null;
}

function doRequest(requestOptions: UniApp.RequestOptions, config: IConfig): Promise<unknown> {
  const { noToast, noLoading, hooks, authRepeat } = config;
  if (!noLoading) {
    showLoading({});
  }
  const processHooks = processHooksCreator(hooks);
  processHooks('beforeHooks', { requestOptions, config });

  console.log('%c request = ', 'color: red; font-size: 14px', { requestOptions, config });

  return new Promise((resolve, reject) => {
    let retry = 0; // 可添加token重试机制
    function _request() {
      uni.request({
        ...requestOptions,
        success: ({ data, statusCode, header, cookies }) => {
          // 根据业务调整
          if (isOk(data)) {
            hideLoading();
            resolve(data);
          } else if (statusCode === 401) {
            // 重试机制
          } else {
            hideLoading();
            processHooks('errorHooks', { data, statusCode, header, cookies });
            // 根据业务调整

            reject({ data, statusCode, header, cookies });
          }
        },
        fail: (result: UniApp.GeneralCallbackResult) => {
          hideLoading();
          !noToast && showToast({ title: result?.errMsg });
          processHooks('failHooks', { requestOptions, config, result });
          reject(result);
        },
        complete: (result) => {
          processHooks('completeHooks', { requestOptions, config, result });
        }
      });
    }
    _request();
  });
}

export default request;
