// enum
declare enum VUE_APP_ENV {
  MOCK = 'mock',
  DEVELOPMENT = 'development',
  PREVIEW = 'preview',
  PRODUCTION = 'production'
}

declare enum HTTP_NAME_SPACE {
  API_GW = 'api_gw',
  CDN = 'cdn',
  CONFIG = 'config',
  LOG = 'log'
}

declare enum COMPARE_RESULT {
  LESS_THEN = -1,
  EQUAL = 0,
  MORE_THEN = 1
}

declare enum WX_AUTHORIZE_SCOPE {
  USER_INFO = 'scope.userInfo', // 用户信息
  USER_LOCATION = 'scope.userLocation', //地理位置
  USER_LOCATION_BACKGROUND = 'scope.userLocationBackground', //	后台定位
  ADDRESS = 'scope.address', //通讯地址（已取消授权，可以直接调用对应接口）
  INVOICE_TITLE = 'scope.invoiceTitle', //发票抬头（已取消授权，可以直接调用对应接口）
  INVOICE = 'scope.invoice', //获取发票（已取消授权，可以直接调用对应接口）
  WE_RUN = 'scope.werun', //微信运动步数
  RECORD = 'scope.record', //录音功能
  WRITE_PHOTOS_ALBUM = 'scope.writePhotosAlbum', //保存到相册
  CAMERA = 'scope.camera' //组件	摄像头
}
