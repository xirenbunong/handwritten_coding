// 编译一段 HTML
function parseHTML(html) {
  // <([a-zA-Z0-9-]+) 表示匹配 < 字符后面紧接着的标签名，标签名可以由大小写字母、数字和短横线组成
  // [^>]* 表示匹配任意不是 > 的字符
  const tagStartRegex = /^<([a-zA-Z0-9-]+)\b[^>]*>/; // 匹配起始标签
  const tagEndRegex = /^<\/([a-zA-Z0-9-]+)[^>]*>/; // 匹配结束标签
  const attrRegex = /\b([a-zA-Z0-9-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/g; // 匹配标签属性

  const root = { type: 'root', children: [] }; // 创建根节点
  let currentParent = root; // 当前节点的父节点为根节点
  const stack = [root]; // 创建节点栈，根节点入栈

  while (html.length > 0) {
    // 举例：'<p class="name">111</p>'
    // ['<p class="name">', 'p', index: 0, input: '<p class="name">111</p>', groups: undefined]
    const tagStartMatch = html.match(tagStartRegex);
    if (tagStartMatch) {
      // tagName：p
      const tagName = tagStartMatch[1];
      const attrs = {};
      let attrMatch;
      while ((attrMatch = attrRegex.exec(tagStartMatch[0].slice(tagStartMatch[0].indexOf(' '))))) {
        const attrName = attrMatch[1];
        const attrValue = attrMatch[2] || attrMatch[3] || attrMatch[4] || '';
        attrs[attrName] = attrValue;
      }

      const element = { type: 'element', tagName, attrs, children: [] }; // 创建元素节点
      currentParent.children.push(element); // 将当前元素节点添加到父节点的子节点列表中
      if (!isEmptyTag(tagName)) {
        stack.push(element); // 将非自闭合标签入栈
        currentParent = element; // 当前节点的父节点变为当前元素节点
      }
      html = html.slice(tagStartMatch[0].length); // 将已处理的标签部分从 HTML 中删除
    } else {
      const tagEndMatch = html.match(tagEndRegex);
      // 如果匹配到标签结束
      if (tagEndMatch) {
        const tagName = tagEndMatch[1];
        const popped = stack.pop(); // 将栈顶元素弹出
        if (popped.tagName === tagName) {
          currentParent = stack[stack.length - 1]; // 当前节点的父节点变为栈顶元素
        } else {
          throw new Error(`Unexpected closing tag: ${tagName}`);
        }
        html = html.slice(tagEndMatch[0].length); // 将已处理的标签部分从 HTML 中删除
      } else {
        const text = html.slice(0, html.indexOf('<')); // 截取文本节点内容
        currentParent.children.push({ type: 'text', content: text }); // 创建文本节点并添加到父节点的子节点列表中
        html = html.slice(text.length); // 将已处理的文本节点内容从 HTML 中删除
      }
    }
  }

  return root.children.length === 1 ? root.children[0] : root; // 如果根节点只有一个子节点，直接返回子节点

  function isEmptyTag(tagName) {
    return ['br', 'hr', 'img', 'input', 'meta', 'area', 'base', 'col', 'command', 'embed', 'keygen', 'link', 'param', 'source', 'track', 'wbr'].includes(tagName); // 判断标签是否为自闭合标签
  }
}

const html = `
  <div class="container">
    <h1>Title</h1>
    <p>Paragraph</p>
    <myinput v-bind="bindinput"></myinput>
  </div>
`;

const ast = parseHTML(html);
console.log(ast);
// {
//   type: 'element',
//   tagName: 'div',
//   attrs: { class: 'container' },
//   children: [
//     { type: 'element', tagName: 'h1', attrs: {}, children: [ { type: 'text', content: 'Title' } ] },
//     { type: 'element', tagName: 'p', attrs: {}, children: [ { type: 'text', content: 'Paragraph' } ] },
//     {
//       type: 'element',
//       tagName: 'myinput',
//       attrs: { 'v-bind': 'bindinput' },
//       children: []
//     }
//   ]
// }
