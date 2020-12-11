module.exports = (api, options, rootOptions) => {
  console.log('op = ', options, rootOptions);

  const { package } = options;

  const dependencies = require('./dependencies.json');
  const devDependencies = require('./devDependencies.json');
  const scripts = require('./scripts.json');

  // 修改 `package.json` 里的字段
  api.extendPackage({
    dependencies: dependencies,
    devDependencies: devDependencies,
    scripts: scripts
  });

  // 复制并用 ejs 渲染 `./template/default` 内所有的文件
  api.render('../template/default');

  // env文件
  api.render({
    './.env.development': '../template/env/.env.development',
    './.env.preview': '../template/env/.env.preview',
    './.env.production': '../template/env/.env.production'
  });

  // 配置文件
  api.render({
    './.gitignore': '../template/.config/.gitignore'
  });

  api.onCreateComplete(() => {
    console.log('I am onCreateComplete');
    console.log('%cI am onCreateComplete', 'color:red;font-size: 16px;');
  });
};
