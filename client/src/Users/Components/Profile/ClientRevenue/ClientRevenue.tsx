import { StyledProfileResumePart, StyledUserResume } from "./Styles";
import Text from "../../../../Shared/Components/Text";
import React from "react";
import { ClientRevenueProps } from "./ClientRevenueProps";
import useDateFormatter from "../../../../Shared/Hooks/useDateFormatter";
import { useTranslation } from "react-i18next";

const ClientRevenue = ({ revenue }: ClientRevenueProps) => {
  const { t } = useTranslation('profile');
  const { simplify } = useDateFormatter();

  return (
    <StyledUserResume>
      <StyledProfileResumePart>
        <Text type={"subtitle"}>{t('resume_spent')}</Text>
        <p>{revenue.spent}</p>
      </StyledProfileResumePart>
      <StyledProfileResumePart part={"middle"}>
        <Text type={"subtitle"}>{t('resume_since')}</Text>
        <p>{simplify(revenue.since)}</p>
      </StyledProfileResumePart>
      <StyledProfileResumePart>
        <Text type={"subtitle"}>{t('resume_recurrent_income')}</Text>
        <p>{revenue.monthlyRecurringRevenue}</p>
      </StyledProfileResumePart>
    </StyledUserResume>
  );
}

export default ClientRevenue;