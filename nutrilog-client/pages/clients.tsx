import type { NextPage } from 'next'
import Table from "../components/User/Table/Table";
import { MainSection } from "../styles/ClientStyles";

const Clients: NextPage = () => {
  return (
    <MainSection>
      <Table columns={[]}/>
    </MainSection>
  );
}

export default Clients;