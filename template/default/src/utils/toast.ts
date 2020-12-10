/**
 * toast 和 loading
 * toast 的优先级 高于 loading
 * 后一个toast 无法覆盖前一个
 */

let isShowToast: boolean = false;
let isShowLoading: boolean = false;

type Res = void | undefined | Promise<any>;

interface toastConfig {
  title: string;
  icon?: string;
  duration?: number;
  mask?: boolean;
}

const DEFAULT_TOAST_CONFIG: toastConfig = {
  title: '',
  icon: 'none',
  duration: 1500,
  mask: true
};

const DEFAULT_LOADING_CONFIG: UniApp.ShowLoadingOptions = {
  title: '',
  mask: true
};

export function showToast(config: toastConfig): Res {
  if (isShowLoading) {
    hideLoading();
  }
  let cfg = {
    ...DEFAULT_TOAST_CONFIG,
    ...config,
    complete: () => {
      isShowToast = false;
    }
  } as UniApp.ShowToastOptions;
  if (isShowToast) return;

  isShowToast = true;
  return uni.showToast(cfg);
}

export function hideToast(): Res {
  isShowToast = false;
  return uni.hideToast();
}

export function showLoading(config: UniApp.ShowLoadingOptions): Res {
  if (isShowToast) return;

  isShowLoading = true;
  return uni.showLoading({
    ...DEFAULT_LOADING_CONFIG,
    ...config,
    complete: () => {
      isShowLoading = false;
    }
  });
}

export function hideLoading(): Res {
  isShowToast = false;
  return uni.hideLoading();
}

export default {
  showToast,
  hideToast,
  showLoading,
  hideLoading,
  DEFAULT_TOAST_CONFIG,
  DEFAULT_LOADING_CONFIG
};
