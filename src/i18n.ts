import * as originalI18n from "i18next";
import * as XHR from "i18next-xhr-backend";
import * as LanguageDetector from "i18next-browser-languagedetector";
import { isProductionEnvironment } from "utils";

export const i18n = originalI18n
    .use(XHR)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        ns: ["common"],
        defaultNS: "common",
        debug: !isProductionEnvironment(),
    });
