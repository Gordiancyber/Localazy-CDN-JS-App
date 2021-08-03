import { i18n, initI18n, getLanguages, getCurrentLanguage, getSupportedLangCodes } from "./i18n";

const createLanguageSelector = () => {
    const languages = getLanguages();
    const langCodes = getSupportedLangCodes();
    let template = '<select id="selector">';
    languages.forEach((l, i) => {
        template += `
    <option ${l.language === getCurrentLanguage() ? "selected" : ""} value="${langCodes[i]}">
      ${l.localizedName}
    </option>`
    })
    template += '</select>';
    return template;
}

const getTranslatedContent = () => {
    return `${i18n.t("hello_localazy")}<br><br>
  ${i18n.t("cdn_testing")}<br><br>
  ${i18n.t("using_javascript")}<br><br>
  ${i18n.t("cdn_info")}<br><br>`;
}

const updateTranslatedContent = () => {
    document.querySelector("#content").innerHTML = getTranslatedContent();
}

const initPageContent = () => {
    document.querySelector("#app").innerHTML = `  
  ${createLanguageSelector()}   
  <div id="content">  
    ${getTranslatedContent()}
  </div>`;

    document.querySelector("#selector").addEventListener("change", (e) => {
        i18n.changeLanguage(e.target.value);
        updateTranslatedContent();
    })
}

initI18n(initPageContent);