import DefaultTheme from "vitepress/theme";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp() {
    if (typeof window === "undefined") return;
    const info = __APP_VERSION__;
    const title = "color: #6366f1; font-size: 14px; font-weight: bold;";
    const label = "color: #94a3b8; font-weight: bold;";
    const time = "color: #22c55e;";
    const git = "color: #f59e0b;";
    console.log(
      `%c🚀 Risen Docs %c
%c📅 构建时间: %c%s
%c📝 提交时间: %c%s
%c🌿 Git 分支: %c%s
%c🔖 Git Commit: %c%s`,
      title,
      "",
      label,
      time,
      info.buildTime,
      label,
      time,
      info.commitTime,
      label,
      git,
      info.branch,
      label,
      git,
      info.commitHash
    );
    window.__BUILD_INFO__ = info;
  },
};
