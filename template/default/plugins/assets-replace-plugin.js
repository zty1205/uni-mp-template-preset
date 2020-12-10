class AssetsReplacePlugin {
  constructor(options) {
    this.assetsName = options.assetsName;
    this.target = options.target;
    this.value = options.value;
  }
  apply(compiler) {
    compiler.hooks.emit.tap('AssetsReplacePlugin', (compilation) => {
      let old = compilation.assets[this.assetsName];
      let self = this;
      old &&
        (compilation.assets[this.assetsName] = {
          source() {
            return old.source().replace(self.target, self.value);
          },
          size() {
            return this.source().length;
          }
        });
    });
  }
}

module.exports = AssetsReplacePlugin;
