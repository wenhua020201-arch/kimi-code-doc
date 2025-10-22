# Cline

## 安装 Cline

若已安装，可跳至下一节。

1. 打开 VS Code，进入扩展视图（`Cmd+Shift+X` / `Ctrl+Shift+X`）。
2. 搜索 `Cline` 并安装官方扩展。
3. 安装完成后，活动栏会出现 Cline 图标；如未出现，可重启 VS Code。

## 配置 Kimi Coding 模型

打开 Cline 面板，按照下面步骤接入 Kimi Coding 模型：

1. 点击右上角齿轮进入设置，在 Providers 中新增或编辑 Moonshot Provider。
2. 按照提示填写：
   - **API Provider**：选择 `Moonshot`
   - **Moonshot Entrypoint**：`api.kimi.com/coding/v1`
   - **Moonshot API Key**：输入在会员页面生成的 API key
   - **Model**：`kimi-for-coding`
3. 需要时可以勾选 `Disable browser tool usage`，避免自动打开浏览器。
4. 点击 `Done` 保存配置。

## 确认模型是否生效

- 在 Cline 界面右上角确认模型名称显示为 `kimi-for-coding`。
- 若提示鉴权失败，请重新核对 API key 或在会员页面重新生成。

完成后即可在 Cline 中使用 Kimi Coding 模型进行开发协作任务。
