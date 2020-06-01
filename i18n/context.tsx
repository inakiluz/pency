import React from "react";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import dictionaries from "./dictionaries";

const I18nProvider: React.FC = ({children}) => {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: dictionaries,
        fallbackLng: "es",
        interpolation: {
          escapeValue: false,
        },
      })
      .then(() => setLoading(false));
  }, []);

  if (isLoading) return null;

  return <>{children}</>;
};

export {I18nProvider as Provider};
