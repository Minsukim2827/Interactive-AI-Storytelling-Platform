import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // 检测用户当前使用的语言
    // 文档: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // 注入 react-i18next 实例
    .use(initReactI18next)
    // 初始化 i18next
    // 配置参数的文档: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    // 这里是我们的翻译文本
                    // This is our translation text
                    websiteName: "AI Storytelling",
                    homeTitle: "An AI Storytelling Website",
                    homeTitle1: "for storybook readers",
                    describe: "Welcome to your go-to destination for storybook collections and discovery! Explore this website of resources and community recommendations to find your next captivating read. Whether you're into epic fantasies, crime thrillers, or interstellar adventures, we've got you covered."
                }
            },
            zh: {
                translation: {
                    websiteName: "AI智能讲故事",
                    homeTitle: "面向故事书读者的",
                    homeTitle1: "人工智能故事网站",
                    describe: "欢迎来到您收藏和发现故事书的首选之地！探索本网站的资源和社区推荐，寻找下一本吸引人的读物。无论您是喜欢史诗幻想、惊悚犯罪还是星际冒险，我们都能满足您的需求。"
                }
            }
        }
    });

