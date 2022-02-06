import React, { useContext, useEffect } from "react";
import Table from "../../../Shared/Components/Table";
import { User } from "../../types";
import { StyledTableCell, StyledTableRow } from "../../../Shared/Components/Table/TableBody/Styles";
import Avatar from "../../../Shared/Components/Avatar";
import { FiArrowRight } from "react-icons/fi";
import { UsersContext } from "../../Context/UsersContext";
import useToastError from "../../../Shared/Hooks/useToastError";
import usePagination from "../../../Shared/Hooks/usePagination";
import { useTranslation } from "react-i18next";
import usePricingBeautifier from "../../Hooks/usePricingBeautifier";
import useDateFormatter from "../../../Shared/Hooks/useDateFormatter";
import useBooleanBeautifier from "../../../Shared/Hooks/useBooleanBeautifier";
import { UserTableProps } from "./UserTableProps";

const UserTable = ({ openProfileModal, selectUser }: UserTableProps) => {
  const { state, fetchUsers, addFilter } = useContext(UsersContext);
  const { notify } = useToastError('login');
  const { pagination, setPage } = usePagination({ total: state.totalUsers });
  const { t } = useTranslation([ 'clients', 'common' ]);
  const { beautify: pricingBeautifier } = usePricingBeautifier();
  const { format } = useDateFormatter();
  const { beautify: booleanBeautifier } = useBooleanBeautifier({
    isTrue: 'enabled',
    isFalse: 'disabled'
  });

  useEffect(() => {
    fetchUsers({ ...pagination, filters: state.filters })
      .catch(error => notify(error));
  }, [ state.filters, pagination ]);

  const onUserSelection = (user: User) => {
    openProfileModal();
    selectUser(user);
  }

  return (
    <Table>
      <Table.Header
        addFilter={addFilter}
      />
      <Table.Body
        collection={state.users}
        rows={[
          t('username_header'),
          t('pricing_header'),
          t('send_warning_notification_header'),
          t('subscription_period_header')
        ]}
        renderRow={(user: User, index: number) => {
          const isLast = index === state.users.length - 1
          return (
            <StyledTableRow key={user.id} isLast={isLast} onClick={() => onUserSelection(user)}>
              <StyledTableCell>
                <Avatar name={user.username} size={35}/>
                {user.username}
              </StyledTableCell>
              <StyledTableCell>
                {pricingBeautifier(user.subscription.pricing.name)}
              </StyledTableCell>
              <StyledTableCell>
                {booleanBeautifier(user.config.sendWarnings)}
              </StyledTableCell>
              <StyledTableCell>
                {format(user.subscription.lastPayment)}
                <FiArrowRight/>
                {format(user.subscription.validTo)}
              </StyledTableCell>
            </StyledTableRow>
          );
        }}
      />
      <Table.Footer
        totalItems={state.totalUsers}
        itemPerPage={pagination.quantity}
        currentPage={pagination.page}
        setPage={setPage}
      />
    </Table>
  );
}

export default UserTable;