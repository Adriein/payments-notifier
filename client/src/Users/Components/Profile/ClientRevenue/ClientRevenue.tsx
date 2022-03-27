import { StyledProfileResumePart, StyledUserResume } from "./Styles";
import Text from "../../../../Shared/Components/Text";
import React, { useContext } from "react";
import { ClientRevenueProps } from "./ClientRevenueProps";
import useDateFormatter from "../../../../Shared/Hooks/useDateFormatter";
import { UsersContext } from "../../../Context/UsersContext";

const ClientRevenue = ({ revenue }: ClientRevenueProps) => {
  const { t } = useContext(UsersContext);
  const { simplify } = useDateFormatter();

  return (
    <StyledUserResume>
      <StyledProfileResumePart>
        <Text type={"subtitle"}>{t('profile:resume_spent')}</Text>
        <p>{revenue.spent}</p>
      </StyledProfileResumePart>
      <StyledProfileResumePart part={"middle"}>
        <Text type={"subtitle"}>{t('profile:resume_since')}</Text>
        <p>{simplify(revenue.since)}</p>
      </StyledProfileResumePart>
      <StyledProfileResumePart>
        <Text type={"subtitle"}>{t('profile:resume_recurrent_income')}</Text>
        <p>{revenue.monthlyRecurringRevenue}</p>
      </StyledProfileResumePart>
    </StyledUserResume>
  );
}

export default ClientRevenue;