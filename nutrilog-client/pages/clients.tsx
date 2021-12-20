import type { NextPage } from 'next'
import Table from "../components/User/Table/Table";
import { MainSection } from "../styles/ClientStyles";
import { UserApiService } from "../services/User/UserApiService";
import { ApiService } from "../services/ApiService";

export async function getServerSideProps(context: any) {
  try {

    const userApiService = new UserApiService(new ApiService())

    const query = await userApiService.findUsers();

    console.log(query);
    if (!query) {
      return {
        notFound: true,
      }
    }

    return {
      props: query
    }
  } catch (error: any) {
    return {
      redirect: {
        destination: '/error/400',
        permanent: false,
      },
    }
  }

}


const Clients: NextPage = (props) => {
  console.log(props);
  return (
    <MainSection>
      <Table columns={[]}/>
    </MainSection>
  );
}

export default Clients;