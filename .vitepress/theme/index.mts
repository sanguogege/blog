import Teek from "vitepress-theme-teek";
import TeekLayoutProvider from "./components/TeekLayoutProvider.vue";

import "vitepress-theme-teek/index.css";
import "vitepress-theme-teek/theme-chalk/tk-code-block-mobile.css";
import "vitepress-theme-teek/theme-chalk/tk-sidebar.css";
import "vitepress-theme-teek/theme-chalk/tk-aside.css";
import "vitepress-theme-teek/theme-chalk/tk-nav.css";
import "vitepress-theme-teek/theme-chalk/tk-doc-h1-gradient.css";
import "vitepress-theme-teek/theme-chalk/tk-doc-fade-in.css";

import "vitepress-theme-teek/theme-chalk/tk-banner-desc-gradient.css";
import "vitepress-theme-teek/theme-chalk/tk-banner-full-img-scale.css";
import "vitepress-theme-teek/theme-chalk/tk-fade-up-animation.css";
import "vitepress-theme-teek/theme-chalk/tk-home-card-hover.css";

import "./styles/index.css";

export default {
    extends: Teek,
    Layout: TeekLayoutProvider,
};
