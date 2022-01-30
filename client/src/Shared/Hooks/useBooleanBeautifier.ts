import { useTranslation } from "react-i18next";

type BooleanDictionary = { isTrue: string, isFalse: string }

const useBooleanBeautifier = (dictionary: BooleanDictionary) => {
  const { t } = useTranslation('common');

  return {
    beautify: (assertion: boolean) => assertion ? t(dictionary["isTrue"]) : t(dictionary["isFalse"])
  }
}

export default useBooleanBeautifier;