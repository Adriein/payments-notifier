import styled from "styled-components";
import { font } from "../Utils/Font";

export const StyledBadge = styled.span`
  width: auto;
  height: 20px;
  line-height: 18px;
  letter-spacing: 0.25px;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  padding: 10px;
  ${font.size(12)};
  ${font.medium};
  border-radius: 5px;
`;