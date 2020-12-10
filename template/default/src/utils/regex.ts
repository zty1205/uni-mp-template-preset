export const SIMPLE_PHONE = /^1[3456789]\d{9}$/; // 11位电话号码
export const SIMPLE_ID = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/; // 身份证判断 不考虑有效性
export const NUMBER = /^\d{1,}$/; //纯数字
export const POSITIVE_INTEGER = /(^[1-9]\d*$)/;

export const SIMPLE_CHINESE_NAME = /[\u4e00-\u9fa5·]{1,19}[\u4e00-\u9fa5]$/; // · 和 中文组成

export const EMOJI = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[A9|AE]\u3030|\uA9|\uAE|\u3030/g;

export const CDN_PREFIX = /(https?:)?\/\/static(\.qa)?\.91jkys.com/;

export const HTTP_LINK = /^(https?:)?\/\//;
