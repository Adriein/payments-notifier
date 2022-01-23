import {
  StyledContainer,
  StyledControlPageButton,
  StyledPaginationButtons,
  StyledPagination,
  StyledPaginationInfo, StyledCurrentPage
} from "./Styles";
import { TableFooterProps } from "./TableFooterProps";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const TableFooter = ({ totalItems, itemPerPage }: TableFooterProps) => {
  const { t } = useTranslation('clients');
  return (
    <StyledContainer>
      <StyledPaginationInfo>
        1 - {itemPerPage} {t('page_filter_info')} {totalItems}
      </StyledPaginationInfo>
      <StyledPagination>
        <StyledCurrentPage>
          {t('current_page_info')} 1
        </StyledCurrentPage>
        <StyledPaginationButtons>
          <StyledControlPageButton size={'small'} variant={'icon'} icon={<FiArrowLeft/>}/>
          <StyledControlPageButton size={'small'} variant={'icon'} icon={<FiArrowRight/>}/>
        </StyledPaginationButtons>
      </StyledPagination>
    </StyledContainer>
  );
}

export default TableFooter;