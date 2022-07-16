// 定义根元素允许的最大值
const MAX_FONT_SIZE = 42

// 监听dom节点内容加载完成时间
document.addEventListener('DOMContentLoaded', () => {
  // 获取html根节点
  const html = document.querySelector('html')
  // 获取当前根元素 fontSize 标准 屏幕宽度 / 10
  let fontSize = window.innerWidth / 10
  // 获取到的fontSize 不能超过定义的最大值
  fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
  // 定义根节点的fontsize大小 （rem）
  html.style.fontSize = fontSize + 'px'
})
