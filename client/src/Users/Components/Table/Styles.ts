import styled from "styled-components";
import Badge from "../../../Shared/Components/Badge";

export const StyledLoaderContainer = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100vh;
  width: 100%;
`;

export const ActiveBadge = styled(Badge)`
  background-color: #E6F8EB;
  color: #28C453;
`;

export const ExpiredBadge = styled(Badge)`
  background-color: #FCDCE1;
  color: #F24B69;
`;