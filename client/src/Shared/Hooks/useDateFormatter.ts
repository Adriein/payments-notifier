import { useTranslation } from "react-i18next";

const useDateFormatter = () => {
  const { t, i18n } = useTranslation('common');

  const format = (date: string): string => {
    const [ weekDay, month, day, year ] = date.split('-');

    const translatedWeekDay = t(`week_days.${weekDay.toLowerCase()}`);
    const translatedMonth = t(`months.${month.toLowerCase()}`);

    const formattedWeekDay = translatedWeekDay.charAt(0).toUpperCase() + translatedWeekDay.slice(1);
    const formattedMonth = translatedMonth.charAt(0).toUpperCase() + translatedMonth.slice(1);

    if (i18n.language !== 'es') {
      return `${formattedWeekDay} ${formattedMonth} ${day} ${year}`;
    }

    return `${formattedWeekDay} ${day} ${formattedMonth} ${year}`;
  }

  const simplify = (date: string): string => {
    const formattedDate = format(date);

    const chunks = formattedDate.split(' ');

    return `${chunks[2]} ${chunks[3]}`
  }

  return {
    format,
    simplify
  }
}

export default useDateFormatter;