import counterpart from "counterpart";
import Translate from "react-translate-component";

export const translate = (str) => {
  return counterpart.translate(str);
};

export const TranslateComponent = () => {
  return Translate;
};
