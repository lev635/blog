export function exampleRemarkPlugin() {
  // すべての remark および rehype プラグインは、別の関数を返します。
  return function (tree, file) {
    file.data.astro.frontmatter.customProperty = '生成されたプロパティ';
  }
}