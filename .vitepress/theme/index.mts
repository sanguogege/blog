import Teek from "vitepress-theme-teek";
import "vitepress-theme-teek/index.css";
import TeekLayoutProvider from "./components/TeekLayoutProvider.vue";


import "./styles/index.css";
export default {
    extends: Teek,
    Layout: TeekLayoutProvider,
};
