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
      { name: 'npm', url: 'https://www.npmjs.com', icon: '📦', description: '包管理器' },
      { name: 'Vercel', url: 'https://vercel.com', icon: '▲', description: '前端部署平台' },
      { name: 'Docker Hub', url: 'https://hub.docker.com', icon: '🐳', description: '容器镜像仓库' },
      { name: 'Postman', url: 'https://www.postman.com', icon: '📮', description: 'API测试工具' },
      { name: 'Bitbucket', url: 'https://bitbucket.org', icon: '🪣', description: 'Git代码托管' },
      { name: 'Heroku', url: 'https://www.heroku.com', icon: '☁️', description: '云应用平台' },
      { name: 'JetBrains', url: 'https://www.jetbrains.com', icon: '🔧', description: '专业IDE' }
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
      { name: 'Canva', url: 'https://www.canva.com', icon: '🖼️', description: '在线设计平台' },
      { name: 'Sketch', url: 'https://www.sketch.com', icon: '💎', description: 'Mac设计工具' },
      { name: 'Pexels', url: 'https://www.pexels.com', icon: '🖼️', description: '免费素材库' },
      { name: 'Pixabay', url: 'https://pixabay.com', icon: '🌄', description: '免费图片视频' },
      { name: 'Adobe Color', url: 'https://color.adobe.com', icon: '🎨', description: '配色工具' },
      { name: 'Coolors', url: 'https://coolors.co', icon: '🌈', description: '配色生成器' },
      { name: 'Flaticon', url: 'https://www.flaticon.com', icon: '🔲', description: '图标资源库' }
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
      { name: '菜鸟教程', url: 'https://www.runoob.com', icon: '🐣', description: '编程入门教程' },
      { name: 'Udemy', url: 'https://www.udemy.com', icon: '🎯', description: '在线课程市场' },
      { name: 'Khan Academy', url: 'https://www.khanacademy.org', icon: '🏫', description: '免费在线教育' },
      { name: 'Codecademy', url: 'https://www.codecademy.com', icon: '💻', description: '互动编程学习' },
      { name: 'W3Schools', url: 'https://www.w3schools.com', icon: '📚', description: 'Web技术教程' },
      { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org', icon: '🤓', description: '计算机科学' },
      { name: 'HackerRank', url: 'https://www.hackerrank.com', icon: '🏆', description: '编程挑战平台' }
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
      { name: '石墨文档', url: 'https://shimo.im', icon: '📄', description: '在线文档' },
      { name: 'Asana', url: 'https://asana.com', icon: '✅', description: '任务管理工具' },
      { name: 'Monday.com', url: 'https://monday.com', icon: '📊', description: '工作操作系统' },
      { name: 'Evernote', url: 'https://evernote.com', icon: '🐘', description: '笔记应用' },
      { name: 'Airtable', url: 'https://airtable.com', icon: '📊', description: '云端数据库' },
      { name: 'Miro', url: 'https://miro.com', icon: '🎯', description: '在线白板' },
      { name: 'ClickUp', url: 'https://clickup.com', icon: '🎯', description: '一体化平台' }
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
      { name: '通义千问', url: 'https://tongyi.aliyun.com', icon: '🌟', description: '阿里AI助手' },
      { name: 'Stable Diffusion', url: 'https://stablediffusionweb.com', icon: '🖼️', description: 'AI图像生成' },
      { name: 'Runway', url: 'https://runwayml.com', icon: '🎬', description: 'AI视频创作' },
      { name: 'Jasper', url: 'https://www.jasper.ai', icon: '✍️', description: 'AI写作助手' },
      { name: 'Perplexity', url: 'https://www.perplexity.ai', icon: '🔍', description: 'AI搜索引擎' },
      { name: 'Cursor', url: 'https://cursor.sh', icon: '💻', description: 'AI代码编辑器' },
      { name: 'V0', url: 'https://v0.dev', icon: '⚡', description: 'Vercel AI生成' }
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
      { name: 'Discord', url: 'https://discord.com', icon: '🎮', description: '游戏社交' },
      { name: 'Reddit', url: 'https://www.reddit.com', icon: '🤖', description: '内容社区' },
      { name: 'Facebook', url: 'https://www.facebook.com', icon: '👥', description: '社交平台' },
      { name: 'TikTok', url: 'https://www.tiktok.com', icon: '🎵', description: '短视频平台' },
      { name: '小红书', url: 'https://www.xiaohongshu.com', icon: '📕', description: '生活分享社区' },
      { name: 'Telegram', url: 'https://telegram.org', icon: '✈️', description: '即时通讯' },
      { name: 'WhatsApp', url: 'https://www.whatsapp.com', icon: '💚', description: '聊天应用' }
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
      { name: '爱奇艺', url: 'https://www.iqiyi.com', icon: '🎥', description: '视频网站' },
      { name: 'Twitch', url: 'https://www.twitch.tv', icon: '🎮', description: '游戏直播' },
      { name: 'Apple Music', url: 'https://music.apple.com', icon: '🍎', description: '苹果音乐' },
      { name: 'SoundCloud', url: 'https://soundcloud.com', icon: '☁️', description: '音乐分享' },
      { name: '腾讯视频', url: 'https://v.qq.com', icon: '🐧', description: '腾讯视频' },
      { name: '优酷', url: 'https://www.youku.com', icon: '🎥', description: '优酷视频' },
      { name: 'QQ音乐', url: 'https://y.qq.com', icon: '🎵', description: 'QQ音乐' }
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
      { name: '小米商城', url: 'https://www.mi.com', icon: '📱', description: '小米官网' },
      { name: 'eBay', url: 'https://www.ebay.com', icon: '🏪', description: '在线拍卖' },
      { name: 'AliExpress', url: 'https://www.aliexpress.com', icon: '🌍', description: '速卖通' },
      { name: '天猫', url: 'https://www.tmall.com', icon: '🐱', description: '天猫商城' },
      { name: '苏宁易购', url: 'https://www.suning.com', icon: '🦁', description: '苏宁易购' },
      { name: '唯品会', url: 'https://www.vip.com', icon: '💎', description: '品牌特卖' },
      { name: '得物', url: 'https://www.dewu.com', icon: '👟', description: '潮流网购' }
    ]
  },
  {
    id: 9,
    name: '新闻资讯',
    icon: '📰',
    color: 'from-slate-500 to-zinc-500',
    websites: [
      { name: 'BBC News', url: 'https://www.bbc.com/news', icon: '📰', description: 'BBC新闻' },
      { name: 'CNN', url: 'https://www.cnn.com', icon: '📺', description: 'CNN新闻' },
      { name: '新华网', url: 'https://www.xinhuanet.com', icon: '🏛️', description: '新华网' },
      { name: '人民网', url: 'https://www.people.com.cn', icon: '🇨🇳', description: '人民网' },
      { name: '澎湃新闻', url: 'https://www.thepaper.cn', icon: '🌊', description: '澎湃新闻' },
      { name: '36氪', url: 'https://36kr.com', icon: '🚀', description: '科技媒体' },
      { name: '虎嗅', url: 'https://www.huxiu.com', icon: '🐯', description: '科技资讯' },
      { name: 'TechCrunch', url: 'https://techcrunch.com', icon: '💻', description: '科技新闻' },
      { name: 'The Verge', url: 'https://www.theverge.com', icon: '🔷', description: '科技媒体' },
      { name: 'Hacker News', url: 'https://news.ycombinator.com', icon: '🧡', description: '黑客新闻' },
      { name: 'Medium', url: 'https://medium.com', icon: 'Ⓜ️', description: '博客平台' },
      { name: 'Dev.to', url: 'https://dev.to', icon: '👩‍💻', description: '开发者社区' }
    ]
  },
  {
    id: 10,
    name: '云存储',
    icon: '☁️',
    color: 'from-sky-500 to-blue-500',
    websites: [
      { name: 'Google Drive', url: 'https://drive.google.com', icon: '📁', description: 'Google云盘' },
      { name: 'Dropbox', url: 'https://www.dropbox.com', icon: '📦', description: '云存储服务' },
      { name: 'OneDrive', url: 'https://onedrive.live.com', icon: '☁️', description: '微软云盘' },
      { name: '百度网盘', url: 'https://pan.baidu.com', icon: '💾', description: '百度网盘' },
      { name: '阿里云盘', url: 'https://www.aliyundrive.com', icon: '☁️', description: '阿里云盘' },
      { name: '腾讯微云', url: 'https://www.weiyun.com', icon: '☁️', description: '腾讯微云' },
      { name: 'iCloud', url: 'https://www.icloud.com', icon: '☁️', description: '苹果云盘' },
      { name: 'Box', url: 'https://www.box.com', icon: '📦', description: '企业云存储' },
      { name: 'Mega', url: 'https://mega.nz', icon: '🔐', description: '加密云存储' },
      { name: 'pCloud', url: 'https://www.pcloud.com', icon: '☁️', description: '欧洲云存储' },
      { name: '坚果云', url: 'https://www.jianguoyun.com', icon: '🥜', description: '同步网盘' },
      { name: '蓝奏云', url: 'https://www.lanzou.com', icon: '🔵', description: '文件分享' }
    ]
  },
  {
    id: 11,
    name: '金融理财',
    icon: '💰',
    color: 'from-amber-500 to-yellow-500',
    websites: [
      { name: '支付宝', url: 'https://www.alipay.com', icon: '💙', description: '支付宝' },
      { name: '微信支付', url: 'https://pay.weixin.qq.com', icon: '💚', description: '微信支付' },
      { name: 'PayPal', url: 'https://www.paypal.com', icon: '💳', description: 'PayPal' },
      { name: '雪球', url: 'https://xueqiu.com', icon: '⚾', description: '投资社区' },
      { name: '东方财富', url: 'https://www.eastmoney.com', icon: '💹', description: '财经资讯' },
      { name: 'Coinbase', url: 'https://www.coinbase.com', icon: '₿', description: '加密货币交易' },
      { name: 'Binance', url: 'https://www.binance.com', icon: '🪙', description: '币安交易所' },
      { name: 'Stripe', url: 'https://stripe.com', icon: '💳', description: '在线支付' },
      { name: 'Wise', url: 'https://wise.com', icon: '🌍', description: '国际汇款' },
      { name: 'Revolut', url: 'https://www.revolut.com', icon: '💳', description: '数字银行' },
      { name: '天天基金', url: 'https://fund.eastmoney.com', icon: '📈', description: '基金平台' },
      { name: '同花顺', url: 'https://www.10jqka.com.cn', icon: '📊', description: '股票软件' }
    ]
  },
  {
    id: 12,
    name: '游戏娱乐',
    icon: '🎮',
    color: 'from-violet-500 to-purple-500',
    websites: [
      { name: 'Steam', url: 'https://store.steampowered.com', icon: '🎮', description: 'Steam游戏平台' },
      { name: 'Epic Games', url: 'https://www.epicgames.com', icon: '🎯', description: 'Epic游戏商城' },
      { name: 'PlayStation', url: 'https://www.playstation.com', icon: '🎮', description: 'PlayStation' },
      { name: 'Xbox', url: 'https://www.xbox.com', icon: '🎮', description: 'Xbox' },
      { name: 'Nintendo', url: 'https://www.nintendo.com', icon: '🎮', description: '任天堂' },
      { name: 'IGN', url: 'https://www.ign.com', icon: '🎮', description: '游戏资讯' },
      { name: 'GameSpot', url: 'https://www.gamespot.com', icon: '🎯', description: '游戏评测' },
      { name: '3DM', url: 'https://www.3dmgame.com', icon: '🎮', description: '3DM游戏网' },
      { name: '游民星空', url: 'https://www.gamersky.com', icon: '⭐', description: '游戏资讯' },
      { name: 'TapTap', url: 'https://www.taptap.cn', icon: '📱', description: '手游社区' },
      { name: 'Roblox', url: 'https://www.roblox.com', icon: '🎮', description: 'Roblox平台' },
      { name: 'GOG', url: 'https://www.gog.com', icon: '🎮', description: '无DRM游戏' }
    ]
  }
]