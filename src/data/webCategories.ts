export interface Website {
  name: string
  url: string
  icon: string
  description?: string
}

export interface Category {
  id: number
  name: string
  icon: string
  color: string
  websites: Website[]
}

export const webCategories: Category[] = [
  {
    id: 1,
    name: '开发工具',
    icon: '💻',
    color: 'from-blue-500 to-cyan-500',
    websites: [
      { name: 'GitHub', url: 'https://github.com', icon: '🐙', description: '代码托管平台' },
      { name: 'GitLab', url: 'https://gitlab.com', icon: '🦊', description: 'DevOps平台' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚', description: '开发者问答' },
      { name: 'CodePen', url: 'https://codepen.io', icon: '✏️', description: '前端代码分享' },
      { name: 'VSCode', url: 'https://code.visualstudio.com', icon: '🔷', description: '代码编辑器' },
      { name: 'npm', url: 'https://www.npmjs.com', icon: '📦', description: '包管理器' }
    ]
  },
  {
    id: 2,
    name: '设计资源',
    icon: '🎨',
    color: 'from-purple-500 to-pink-500',
    websites: [
      { name: 'Figma', url: 'https://www.figma.com', icon: '🎨', description: '界面设计工具' },
      { name: 'Dribbble', url: 'https://dribbble.com', icon: '🏀', description: '设计作品展示' },
      { name: 'Behance', url: 'https://www.behance.net', icon: '🎭', description: 'Adobe设计社区' },
      { name: 'Unsplash', url: 'https://unsplash.com', icon: '📷', description: '免费高清图片' },
      { name: 'Iconfont', url: 'https://www.iconfont.cn', icon: '🔣', description: '阿里图标库' },
      { name: 'Canva', url: 'https://www.canva.com', icon: '🖼️', description: '在线设计平台' }
    ]
  },
  {
    id: 3,
    name: '学习资源',
    icon: '📚',
    color: 'from-green-500 to-emerald-500',
    websites: [
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: '📖', description: 'Web开发文档' },
      { name: 'Coursera', url: 'https://www.coursera.org', icon: '🎓', description: '在线课程平台' },
      { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org', icon: '🔥', description: '免费编程学习' },
      { name: '掘金', url: 'https://juejin.cn', icon: '⛏️', description: '技术社区' },
      { name: 'LeetCode', url: 'https://leetcode.com', icon: '🧩', description: '算法练习平台' },
      { name: '菜鸟教程', url: 'https://www.runoob.com', icon: '🐣', description: '编程入门教程' }
    ]
  },
  {
    id: 4,
    name: '效率工具',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-500',
    websites: [
      { name: 'Notion', url: 'https://www.notion.so', icon: '📝', description: '笔记协作工具' },
      { name: 'Trello', url: 'https://trello.com', icon: '📋', description: '项目管理' },
      { name: 'Slack', url: 'https://slack.com', icon: '💬', description: '团队沟通' },
      { name: 'Zoom', url: 'https://zoom.us', icon: '🎥', description: '视频会议' },
      { name: '飞书', url: 'https://www.feishu.cn', icon: '🚀', description: '企业协作平台' },
      { name: '石墨文档', url: 'https://shimo.im', icon: '📄', description: '在线文档' }
    ]
  },
  {
    id: 5,
    name: 'AI工具',
    icon: '🤖',
    color: 'from-indigo-500 to-purple-500',
    websites: [
      { name: 'ChatGPT', url: 'https://chat.openai.com', icon: '🧠', description: 'AI对话助手' },
      { name: 'Midjourney', url: 'https://www.midjourney.com', icon: '🎨', description: 'AI绘画工具' },
      { name: 'Claude', url: 'https://claude.ai', icon: '🤖', description: 'Anthropic AI' },
      { name: 'Copilot', url: 'https://github.com/features/copilot', icon: '✨', description: 'AI编程助手' },
      { name: '文心一言', url: 'https://yiyan.baidu.com', icon: '💭', description: '百度AI助手' },
      { name: '通义千问', url: 'https://tongyi.aliyun.com', icon: '🌟', description: '阿里AI助手' }
    ]
  },
  {
    id: 6,
    name: '社交媒体',
    icon: '💬',
    color: 'from-red-500 to-pink-500',
    websites: [
      { name: 'Twitter', url: 'https://twitter.com', icon: '🐦', description: '社交网络' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: '💼', description: '职业社交' },
      { name: 'Instagram', url: 'https://www.instagram.com', icon: '📷', description: '图片社交' },
      { name: '微博', url: 'https://weibo.com', icon: '📱', description: '微博社交' },
      { name: '知乎', url: 'https://www.zhihu.com', icon: '💡', description: '问答社区' },
      { name: 'Discord', url: 'https://discord.com', icon: '🎮', description: '游戏社交' }
    ]
  },
  {
    id: 7,
    name: '娱乐影音',
    icon: '🎬',
    color: 'from-rose-500 to-orange-500',
    websites: [
      { name: 'YouTube', url: 'https://www.youtube.com', icon: '📺', description: '视频平台' },
      { name: 'Netflix', url: 'https://www.netflix.com', icon: '🎬', description: '流媒体服务' },
      { name: 'Spotify', url: 'https://www.spotify.com', icon: '🎵', description: '音乐流媒体' },
      { name: '哔哩哔哩', url: 'https://www.bilibili.com', icon: '📺', description: 'B站' },
      { name: '网易云音乐', url: 'https://music.163.com', icon: '🎶', description: '音乐平台' },
      { name: '爱奇艺', url: 'https://www.iqiyi.com', icon: '🎥', description: '视频网站' }
    ]
  },
  {
    id: 8,
    name: '购物平台',
    icon: '🛍️',
    color: 'from-cyan-500 to-blue-500',
    websites: [
      { name: 'Amazon', url: 'https://www.amazon.com', icon: '📦', description: '亚马逊' },
      { name: '淘宝', url: 'https://www.taobao.com', icon: '🛒', description: '淘宝网' },
      { name: '京东', url: 'https://www.jd.com', icon: '🛍️', description: '京东商城' },
      { name: '拼多多', url: 'https://www.pinduoduo.com', icon: '🎁', description: '拼购平台' },
      { name: 'Apple Store', url: 'https://www.apple.com', icon: '🍎', description: '苹果商店' },
      { name: '小米商城', url: 'https://www.mi.com', icon: '📱', description: '小米官网' }
    ]
  }
]