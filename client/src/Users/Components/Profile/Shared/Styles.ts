import styled from "styled-components";
import ScrollArea from "../../../../Shared/Components/ScrollArea";

export const StyledSubscriptionInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export const StyledScrollArea = styled<any>(ScrollArea)`
  width: 100%;
  max-height: ${({ height }: any) => height ? `${height}px` : '100%'};
  overflow: hidden;
  border-radius: 4px;
`;

export const StyledViewport = styled(ScrollArea.Viewport)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

export const StyledScrollBar = styled(ScrollArea.Scrollbar)`
  display: flex;
  padding: 2px;
  background: #e4e4e4;

  &:hover {
    background: #C7C7C7;
  }

  &[data-orientation="vertical"] {
    width: 10px;
  }

`;

export const StyledThumb = styled(ScrollArea.Thumb)`
  flex: 1;
  background-color: #86848D;
  position: relative;
  border-radius: 10px;
`;

export const StyledScrollContent = styled.div<any>`
  display: flex;
  flex-direction: column;
  gap: ${({ separation }) => separation ? separation : '5'}px;
`;