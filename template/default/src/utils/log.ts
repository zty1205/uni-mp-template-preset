import { getUUID } from './util';

const LOG_ACTIONS = {
  TEST: 'test'
};

interface wxLogConfig {
  trackKey: string;
  url: string;
  userId?: undefined | string | number;
  token?: undefined | string;
  defaultCustom?: undefined | AnyObject;
}

class WxLog {
  static actions = LOG_ACTIONS;

  private trackKey: string;
  private url: string;
  public userId: undefined | string | number;
  public token: undefined | string;
  public defaultCustom: undefined | AnyObject;
  constructor(config: wxLogConfig) {
    this.trackKey = config.trackKey;
    this.url = config.url;
    this.userId = config.userId;
    this.token = config.token;
    this.defaultCustom = config.defaultCustom;
  }

  log(trackId: string, custom?: AnyObject): void {
    console.log('log');
    try {
      uni.request({
        url: this.url,
        method: 'POST',
        data: {
          trackKey: this.trackKey,
          data: {
            isLogin: !!(this.userId || this.token),
            items: [
              {
                id: getUUID(),
                uid: this.userId,
                token: this.token,
                trackTime: Date.now(),
                trackId: trackId,
                custom: { ...this.defaultCustom, ...custom, token: this.token }
              }
            ]
          }
        }
      });
    } catch (err) {
      console.log('log err: ', err);
    }
  }
}

export default WxLog;
