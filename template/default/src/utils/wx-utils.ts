import { isDef } from './util';

// 微信相关方法
interface openModalToSettingOptions extends UniApp.ShowModalOptions {
  withSubscriptions?: boolean;
}

interface modalSuccessRes {
  confirm: boolean;
  cancel: boolean;
}

/**
 * 打开模态窗去设置页面
 * @param options options中的success, fail, complete无效； withSubscription在小程序2.10.3版本以上起效
 */
export function openModalToSetting(options: openModalToSettingOptions): Promise<UniApp.GetSettingSuccessResult> {
  const { withSubscriptions, ...modalOptions } = options;
  return new Promise((resolve, reject) => {
    uni.showModal({
      ...modalOptions,
      success: (res: modalSuccessRes) => {
        if (res.confirm) {
          uni.openSetting({
            // @ts-ignore: withSubscription在小程序2.10.3版本以上起效
            withSubscriptions,
            success: (result: UniApp.GetSettingSuccessResult) => {
              resolve(result);
            },
            fail: (error) => {
              reject(error);
            }
          });
        } else {
          reject();
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 是否为安卓
 */
export function isAndroid(): boolean {
  return uni.getSystemInfoSync().platform.toLocaleLowerCase() === 'android';
}

/**
 * 是否为ios
 */
export function isIOS(): boolean {
  return uni.getSystemInfoSync().platform.toLocaleLowerCase() === 'ios';
}

/**
 * 是否为开发工具
 */
export function isDevTools(): boolean {
  return uni.getSystemInfoSync().platform.toLocaleLowerCase() === 'devtools';
}

/**
 * 比较两个版本 v1 > v1 返回1, 等于返回0，小于返回-1
 * @param v1 'Major.Minor.Patch'
 * @param v2 'Major.Minor.Patch'
 */
export function compareVersion(v1: string, v2: string): COMPARE_RESULT {
  let _v1 = v1.split('.');
  let _v2 = v2.split('.');
  const len = Math.max(_v1.length, _v2.length);

  while (_v1.length < len) {
    _v1.push('0');
  }
  while (_v2.length < len) {
    _v2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(_v1[i]);
    const num2 = parseInt(_v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

/**
 * 微信授权，仅限于可以直接通过api进行授权
 * @param scope 不支持 userInfo userLocationBackground
 * @param content 拒绝后的模态窗文字
 */
export function authByWxApi(scope: WX_AUTHORIZE_SCOPE, content: string): Promise<void> {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: (result: UniApp.GetSettingSuccessResult) => {
        const { authSetting } = result;
        // @ts-ignore
        if (authSetting[scope]) {
          // 已授权
          resolve();
          // @ts-ignore
        } else if (isDef(authSetting[scope])) {
          // 拒绝
          openModalToSetting({ title: '微信授权', content })
            .then((settingSuccessResult: UniApp.GetSettingSuccessResult) => {
              const { authSetting } = settingSuccessResult;
              // @ts-ignore
              if (authSetting[scope]) {
                resolve();
              } else {
                reject(authSetting);
              }
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          // 未授权
          uni.authorize({
            scope,
            success: () => {
              resolve();
            },
            fail: (err) => {
              reject(err);
            }
          });
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

enum GetLocationErrorType {
  SYSTEM_FAIL,
  REJECT
}
interface getLocationErrorRes {
  type: GetLocationErrorType;
  errMsg: string;
  origin?: any;
}

export function getLocation(): Promise<UniApp.GetLocationSuccess> {
  return new Promise((resolve, reject) => {
    const { locationEnabled, locationAuthorized } = uni.getSystemInfoSync();
    if (!locationEnabled) {
      reject({
        type: GetLocationErrorType.SYSTEM_FAIL,
        errMsg: '请到系统设置打开地理位置的系统开关'
      });
      return;
    }
    if (!locationAuthorized) {
      reject({
        type: GetLocationErrorType.SYSTEM_FAIL,
        errMsg: '请到设置页面打开允许微信使用定位的开关'
      });
      return;
    }
    uni.authorize({
      scope: 'scope.userLocation',
      success: () => {
        uni.getLocation({
          success: (res: UniApp.GetLocationSuccess) => {
            resolve(res);
          },
          fail: (e) => {
            reject({
              type: GetLocationErrorType.REJECT,
              errMsg: '请允许授权微信使用您的地理位置',
              origin: e
            });
          }
        });
      },
      fail: (e) => {
        reject({
          type: GetLocationErrorType.SYSTEM_FAIL,
          errMsg: '请确认是否打开了系统/微信的地理位置开关',
          origin: e
        });
      }
    });
  });
}
