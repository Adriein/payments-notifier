import { useTranslation } from "react-i18next";

const usePricingBeautifier = () => {
  const { t } = useTranslation('common');

  const beautify = (pricingName: string) => {
    const needle = `${pricingName}_pricing`;

    return t(needle);
  };

  return {
    beautify
  }
}

export default usePricingBeautifier;