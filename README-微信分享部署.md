# 训练打卡 App 微信分享部署说明

这是一个纯静态网页版本，不需要服务器和数据库。朋友通过微信打开链接后，记录会保存在各自手机浏览器本地，彼此之间不会同步。

## 最简单的 GitHub Pages 发布方式

1. 登录 GitHub，点击右上角 `+`，选择 `New repository`。
2. Repository name 填：`fitness-tracker`。
3. 选择 `Public`，点击 `Create repository`。
4. 进入新仓库页面，点击 `uploading an existing file`。
5. 把当前 `fitness-tracker` 文件夹里的所有内容上传：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `assets` 文件夹
   - 这份说明文件可传可不传
6. 点击 `Commit changes`。
7. 进入仓库 `Settings` -> `Pages`。
8. `Build and deployment` 里：
   - Source 选择 `Deploy from a branch`
   - Branch 选择 `main`
   - Folder 选择 `/root`
9. 点击 `Save`，等待 1-3 分钟。
10. GitHub 会生成一个网址，通常长这样：
    `https://你的用户名.github.io/fitness-tracker/`

把这个网址发到微信，朋友就能打开使用。

## 注意

- 这是个人本地记录版，每个人的数据只保存在自己的手机浏览器里。
- 每次打卡、输入状态、编辑个人信息都会自动保存到当前浏览器本地。
- 右上角和个人信息侧边栏都可以导出备份；个人信息侧边栏也可以导入备份。
- 如果朋友清理浏览器缓存、换手机、换浏览器，记录可能不会自动跟随；建议每周导出一次备份。
- 如果以后想做朋友间互相查看打卡、排行榜、提醒推送，就需要升级为带后端的多人同步版。
