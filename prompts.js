module.exports = [
  {
    type: 'checkbox',
    message: '选择你需要初始化的功能模块:',
    name: 'package',
    choices: [
      {
        name: '@zyf2e/capsule-ui',
        checked: true // 默认选中
      }
    ]
  }
];
