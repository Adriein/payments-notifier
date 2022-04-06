import React, { useContext, useEffect } from "react";
import Table from "../../../Shared/Components/Table";
import { StyledTableCell, StyledTableRow } from "../../../Shared/Components/Table/TableBody/Styles";
import Avatar from "../../../Shared/Components/Avatar";
import { FiArrowRight, FiTrash, FiRefreshCcw } from "react-icons/fi";
import { UsersContext } from "../../Context/UsersContext";
import usePagination from "../../../Shared/Hooks/usePagination";
import usePricingBeautifier from "../../Hooks/usePricingBeautifier";
import useDateFormatter from "../../../Shared/Hooks/useDateFormatter";
import useBooleanBeautifier from "../../../Shared/Hooks/useBooleanBeautifier";
import { UserTableProps } from "./UserTableProps";
import Loader from "../../../Shared/Components/Loader";
import { StringHelper } from "../../../Shared/Services/StringHelper";
import ContextMenu from "../../../Shared/Components/ContextMenu";
import { StyledLoaderContainer } from "./Styles";
import { ClientList } from "../../Models/ClientList";
import { ActiveBadge, ExpiredBadge } from "../Profile/SubscriptionResume/Styles";

const UserTable = ({ openProfileModal, selectUser, isModalOpen }: UserTableProps) => {
  const { state, fetchClientList, t, notify } = useContext(UsersContext);
  const { pagination, setPage } = usePagination({ total: state.totalUsers });
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
      } catch (error: any) {
        notify.error(t(`common:${error.key}`));
      }
    })();
  }, [ state.filters, pagination ]);

  const onClientSelection = (id: string) => {
    openProfileModal();
    selectUser(id);
  }

  return (
    <Table>
      <Table.Header/>
      {state.isLoading && !isModalOpen() ? (
        <StyledLoaderContainer>
          <Loader color={"blue"} size={80} variant={'filled'} logo/>
        </StyledLoaderContainer>
      ) : (<Table.Body
        collection={state.clientList}
        rows={[
          t('clients:username_header'),
          t('clients:pricing_header'),
          t('clients:subscription_status_header'),
          t('clients:send_warning_notification_header'),
          t('clients:subscription_period_header'),
        ]}
        renderRow={(client: ClientList, index: number) => {
          const isLast = index === state.clientList.length - 1
          return (
            <ContextMenu key={client.id}>
              <ContextMenu.Trigger>
                <StyledTableRow isLast={isLast} onClick={() => onClientSelection(client.id)}>
                  <StyledTableCell>
                    <Avatar name={client.username} size={35}/>
                    {client.username}
                  </StyledTableCell>
                  <StyledTableCell>
                    {StringHelper.firstLetterToUpperCase(pricingBeautifier(client.pricingName))}
                  </StyledTableCell>
                  <StyledTableCell>
                    {client.isSubscriptionExpired ? <ExpiredBadge text={t('profile:subscription_badge_expired')}/> :
                      <ActiveBadge text={t('profile:subscription_badge_active')}/>}
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
      />)}
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