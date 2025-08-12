<template>
  <div class="about-settings">
    <div class="about-header">
      <div class="logo-section">
        <div class="logo-icon">❄️</div>
        <h2>极点起始页</h2>
        <span class="version-badge">v0.9.0</span>
      </div>
    </div>

    <div class="about-content">
      <div class="feature-section">
        <h3>✨ 产品特色</h3>
        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-icon">🖼️</span>
            <div class="feature-text">
              <strong>微软必应每日壁纸</strong>
              <p>每日自动更新来自微软必应的高质量壁纸，让您的起始页焕然一新</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🪟</span>
            <div class="feature-text">
              <strong>苹果液态玻璃设计</strong>
              <p>采用苹果最新的液态玻璃设计美学，带来极致的视觉体验</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">⚡</span>
            <div class="feature-text">
              <strong>极速响应</strong>
              <p>优化的性能表现，毫秒级响应速度，让浏览更加流畅</p>
            </div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <h3>📋 项目信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">项目名称：</span>
            <span class="info-value">极点起始页 (PolarStart)</span>
          </div>
          <div class="info-item">
            <span class="info-label">当前版本：</span>
            <span class="info-value">0.9.0 Beta</span>
          </div>
          <div class="info-item">
            <span class="info-label">开发团队：</span>
            <span class="info-value">极点维度</span>
          </div>
          <div class="info-item">
            <span class="info-label">开源协议：</span>
            <span class="info-value">MIT License</span>
          </div>
        </div>
      </div>

      <div class="open-source-section">
        <h3>🌟 开源地址</h3>
        <p class="open-source-desc">
          极点起始页是一个完全开源的项目，欢迎社区贡献和反馈。
        </p>
        <div class="github-link">
          <a href="https://github.com/qgming/polarstart" target="_blank" class="github-btn">
            <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub: qgming/polarstart</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  close: []
}>()
</script>

<style scoped>
.about-settings {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.logo-icon {
  font-size: 32px;
}

.logo-section h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
}

.version-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.feature-section h3,
.info-section h3,
.open-source-section h3 {
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.feature-item {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  padding: 15px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.feature-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.feature-text strong {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.feature-text p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.info-grid {
  display: grid;
  gap: 10px;
}

.info-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: #333;
  min-width: 100px;
}

.info-value {
  color: #666;
}

.open-source-desc {
  margin: 0 0 15px 0;
  color: #666;
  line-height: 1.5;
}

.github-link {
  text-align: center;
}

.github-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #24292e;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.github-btn:hover {
  background: #1a1e22;
  transform: translateY(-1px);
}

.github-icon {
  width: 20px;
  height: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-settings {
    padding: 15px;
  }

  .logo-section {
    flex-direction: column;
    gap: 8px;
  }

  .logo-section h2 {
    font-size: 20px;
  }

  .feature-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>