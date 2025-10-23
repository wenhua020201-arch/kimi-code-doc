# Roo Code

## 安装 Roo Code

若已安装，可跳至下一节。

1. 打开 VS Code，进入扩展视图（`Cmd+Shift+X` / `Ctrl+Shift+X`）。
2. 搜索 `Roo Code` 并安装 Roo Code 官方扩展。
3. 安装完成后，活动栏会出现 Roo Code 图标；如未出现，可重启 VS Code。

## 配置 Kimi Coding 模型

1. 打开 Roo Code 面板，进入设置页。
2. 在 Providers 区域选择 `Moonshot`（或新建自定义 Provider），按照提示填写：
   - **Entrypoint**：`api.kimi.com/coding/v1`
   - **API Key**：输入在会员页面获取的 Kimi CLI API Key
   - **Model**：`kimi-for-coding`
3. 如无需浏览器自动化，可关闭相关选项。
4. 保存后返回 Roo Code 主界面，新建会话即可使用。

## 确认模型是否生效

- Roo Code 侧边栏顶部的模型下拉列表应显示 `kimi-for-coding`。
- 若提示鉴权失败，请确认 API Key 是否复制完整，或在会员中心重新生成。

完成配置后，即可在 Roo Code 中调用 Kimi Coding 模型开展代码开发与协作。
