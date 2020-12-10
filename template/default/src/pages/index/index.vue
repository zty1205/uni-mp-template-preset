<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
import toat, { showLoading, showToast } from '../../utils/toast';
import request from '../../api/request';
export default {
  data() {
    return {
      title: 'Hello'
    };
  },
  onLoad() {},
  methods: {},
  mounted() {
    // console.log('toat = ', toat);
    // showLoading({ title: 'loading' });
    // showToast({ title: 'toast' });
    request({
      url: '/api/drugstore/1.0/get_default_store_info_v2',
      method: 'GET',
      params: { version: 2 },
      data: { v: 1 }
    }).then((res) => {
      console.log('res = ', res);
    });
  }
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
