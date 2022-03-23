import React, { useContext, useEffect } from "react";
import Table from "../../../Shared/Components/Table";
import { ClientList } from "../../types";
import { StyledTableCell, StyledTableRow } from "../../../Shared/Components/Table/TableBody/Styles";
import Avatar from "../../../Shared/Components/Avatar";
import { FiArrowRight, FiTrash, FiRefreshCcw } from "react-icons/fi";
import { UsersContext } from "../../Context/UsersContext";
import useToastError from "../../../Shared/Hooks/useToastError";
import usePagination from "../../../Shared/Hooks/usePagination";
import { useTranslation } from "react-i18next";
import usePricingBeautifier from "../../Hooks/usePricingBeautifier";
import useDateFormatter from "../../../Shared/Hooks/useDateFormatter";
import useBooleanBeautifier from "../../../Shared/Hooks/useBooleanBeautifier";
import { UserTableProps } from "./UserTableProps";
import Loader from "../../../Shared/Components/Loader";
import { StringHelper } from "../../../Shared/Services/StringHelper";
import ContextMenu from "../../../Shared/Components/ContextMenu";

const UserTable = ({ openProfileModal, selectUser, isModalOpen }: UserTableProps) => {
  const { state, fetchClientList, addFilter } = useContext(UsersContext);
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
    (async () => {
      try {
        await fetchClientList({ ...pagination, filters: state.filters });
      } catch (error: unknown) {
        notify(error);
      }
    })();
  }, [ state.filters, pagination ]);

  const onClientSelection = (id: string) => {
    openProfileModal();
    selectUser(id);
  }

  return (
    <>
      {state.isLoading && !isModalOpen() ? <Loader color={"blue"} size={80} logo/> : (
        <Table>
          <Table.Header
            addFilter={addFilter}
          />
          <Table.Body
            collection={state.clientList}
            rows={[
              t('username_header'),
              t('pricing_header'),
              t('send_warning_notification_header'),
              t('subscription_period_header'),
            ]}
            renderRow={(client: ClientList, index: number) => {
              const isLast = index === state.clientList.length - 1
              return (
                <ContextMenu>
                  <ContextMenu.Trigger>
                    <StyledTableRow key={client.id} isLast={isLast} onClick={() => onClientSelection(client.id)}>
                      <StyledTableCell>
                        <Avatar name={client.username} size={35}/>
                        {client.username}
                      </StyledTableCell>
                      <StyledTableCell>
                        {StringHelper.firstLetterToUpperCase(pricingBeautifier(client.pricingName))}
                      </StyledTableCell>
                      <StyledTableCell>
                        {StringHelper.firstLetterToUpperCase(booleanBeautifier(client.sendWarnings))}
                      </StyledTableCell>
                      <StyledTableCell>
                        {format(client.lastPaymentDate)}
                        <FiArrowRight/>
                        {format(client.validTo)}
                      </StyledTableCell>
                    </StyledTableRow>
                  </ContextMenu.Trigger>
                  <ContextMenu.Content>
                    <ContextMenu.Label>
                      <Avatar name={client.username} size={20}/>
                      {client.username}
                    </ContextMenu.Label>
                    <ContextMenu.Separator/>
                    <ContextMenu.Item><FiRefreshCcw/> Renew subscription</ContextMenu.Item>
                    <ContextMenu.Item>Activate warnings</ContextMenu.Item>
                    <ContextMenu.Item>Activate notifications</ContextMenu.Item>
                    <ContextMenu.Separator/>
                    <ContextMenu.Item><FiTrash/> Delete client</ContextMenu.Item>
                  </ContextMenu.Content>
                </ContextMenu>
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
      )}
    </>
  );
}

export default UserTable;