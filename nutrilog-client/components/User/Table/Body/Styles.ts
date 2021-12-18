import styled from 'styled-components';

export const StyledBody = styled.div`
  padding: 10px;
  display: grid;
  overflow: auto;
  grid-template-columns: 54px 200px 200px 200px 200px 200px 200px 200px auto max-content;
  grid-template-rows: repeat(22, max-content);
`;