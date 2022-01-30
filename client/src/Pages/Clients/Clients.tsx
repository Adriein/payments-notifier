import React, { useContext, useEffect } from 'react';
import { UsersContext } from "../../Users/Context/UsersContext";
import useToastError from "../../Shared/Hooks/useToastError";
import usePagination from "../../Shared/Hooks/usePagination";
import Table from "../../Users/Components/Table";
import { User } from "../../Users/types";
import Avatar from "../../Shared/Components/Avatar";
import { StyledTableCell, StyledTableRow } from "../../Users/Components/Table/TableBody/Styles";
import { FiArrowRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import useBooleanBeautifier from "../../Shared/Hooks/useBooleanBeautifier";
import usePricingBeautifier from "../../Users/Hooks/usePricingBeautifier";
import useDateFormatter from "../../Shared/Hooks/useDateFormatter";

const Clients = () => {
  const { state, fetchUsers, addFilter } = useContext(UsersContext);
  const { notify } = useToastError('login');
  const { pagination, setPage } = usePagination({ total: state.totalUsers });
  const { t } = useTranslation([ 'clients', 'common' ]);
  const { beautify: pricingBeautifier } = usePricingBeautifier();
  const { format } = useDateFormatter();
  const { beautify: booleanBeautifier } = useBooleanBeautifier({
    isTrue: 'enviar avisos',
    isFalse: 'no enviar avisos'
  });

  useEffect(() => {
    fetchUsers({ ...pagination, filters: state.filters })
      .catch(error => notify(error));
  }, [ state.filters, pagination ]);

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
            <StyledTableRow key={user.id} isLast={isLast}>
              <StyledTableCell>
                <Avatar name={user.username} size={25}/>
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
  )
}

export default Clients;