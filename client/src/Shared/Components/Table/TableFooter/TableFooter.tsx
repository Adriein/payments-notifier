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
            size={'small'}
            variant={'icon'}
            icon={<FiArrowLeft/>}
            onClick={() => setPage(currentPage - 1)}
          />
          <StyledControlPageButton
            size={'small'}
            variant={'icon'}
            icon={<FiArrowRight/>}
            onClick={() => setPage(currentPage + 1)}
          />
        </StyledPaginationButtons>
      </StyledPagination>
    </StyledContainer>
  );
}

export default TableFooter;