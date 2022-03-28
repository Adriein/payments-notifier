import {
  StyledContainer,
  StyledControlPageButton,
  StyledPaginationButtons,
  StyledPagination,
  StyledPaginationInfo, StyledCurrentPage
} from "./Styles";
import { TableFooterProps } from "./TableFooterProps";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useContext } from "react";
import { UsersContext } from "../../../../Users/Context/UsersContext";

const TableFooter = ({ totalItems, itemPerPage, setPage, currentPage }: TableFooterProps) => {
  const { t } = useContext(UsersContext);

  const startItemShown = () => {
    return (currentPage * itemPerPage) - (itemPerPage - 1);
  }

  const endItemShown = () => {
    return Math.min(startItemShown() + itemPerPage - 1, totalItems);
  }

  return (
    <StyledContainer>
      <StyledPaginationInfo>
        {startItemShown()} - {endItemShown()} {t('clients:page_filter_info')} {totalItems}
      </StyledPaginationInfo>
      <StyledPagination>
        <StyledCurrentPage>
          {t('clients:current_page_info')} {currentPage}
        </StyledCurrentPage>
        <StyledPaginationButtons>
          <StyledControlPageButton
            size={'md'}
            variant={'hover'}
            radius={'md'}
            color={'gray'}
            onClick={() => setPage(currentPage - 1)}
          >
            <FiArrowLeft/>
          </StyledControlPageButton>
          <StyledControlPageButton
            size={'md'}
            variant={'hover'}
            radius={'md'}
            color={'gray'}
            onClick={() => setPage(currentPage + 1)}
          >
            <FiArrowRight/>
          </StyledControlPageButton>
        </StyledPaginationButtons>
      </StyledPagination>
    </StyledContainer>
  );
}

export default TableFooter;