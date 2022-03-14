import { StyledProfileResumePart, StyledUserResume } from "./Styles";
import Text from "../../../../Shared/Components/Text";
import React from "react";
import { ClientRevenueProps } from "./ClientRevenueProps";
import useDateFormatter from "../../../../Shared/Hooks/useDateFormatter";

const ClientRevenue = ({ revenue }: ClientRevenueProps) => {
  const { simplify } = useDateFormatter();

  return (
    <StyledUserResume>
      <StyledProfileResumePart>
        <Text type={"subtitle"}>Spent</Text>
        <p>{revenue.spent}</p>
      </StyledProfileResumePart>
      <StyledProfileResumePart part={"middle"}>
        <Text type={"subtitle"}>Since</Text>
        <p>{simplify(revenue.since)}</p>
      </StyledProfileResumePart>
      <StyledProfileResumePart>
        <Text type={"subtitle"}>Mrr</Text>
        <p>{revenue.monthlyRecurringRevenue}</p>
      </StyledProfileResumePart>
    </StyledUserResume>
  );
}

export default ClientRevenue;