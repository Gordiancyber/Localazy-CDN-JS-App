
import i18next from "i18next";

export const i18n = i18next;

export let localazyLocales = [];


export const fetchLanguage = async (code) => {
  const result = await fetch(`https://delivery.localazy.com/_a855374211039568660198b39c31/_e0/dfe5b84c1598c8c56b6f1a11efcd483bb3f417ea/${code}/file.json`);  
  return result.json();
}

export const fetchLocalazyMeta = async () => {
  const result = await fetch(`https://delivery.localazy.com/_a855374211039568660198b39c31/_e0.json`); 
  localazyLocales = Object.values(await result.json())[0]["locales"];
}

export const getSupportedLangCodes = () => {

const languages =localazyLocales.map(
    (locale) => {
      let langCode = locale.language;
      if (locale.region) {
        langCode = langCode + "-" + locale.region;
      }

      return langCode;
    }
  );

  return languages;
}

export const getCurrentLanguage = () => {
  return window.localStorage.i18nextLng || 'en';
}

export const getLanguages = ()=>{

  return localazyLocales;
}

export const initI18n = async (callback) => {

  await fetchLocalazyMeta()
  const langCodes = getSupportedLangCodes();
  const result = await Promise.all([
    ...langCodes.map(lng=> fetchLanguage(lng))
  ]);

  let resources = {};

  result.forEach((res,index)=>{
    resources[langCodes[index]] = {translation: res};
  })
  i18next.init({
    lng: "en",
    fallbackLng: "en",
    debug: true,
    supportedLngs: langCodes,
    resources,
  }, function (err, t) {
    callback()
  });
}