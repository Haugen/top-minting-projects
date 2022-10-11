import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { fetchData } from "../utils/fetch-data";
import { Project } from "../utils/types";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["topMinting"], () => fetchData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home = () => {
  const { data } = useQuery(
    ["topMinting"],
    async () => {
      const result = await axios.get("/api/fetch");
      return result?.data?.data as Project[];
    },
    {
      staleTime: 2000,
    }
  );

  return (
    <div>
      {data?.map((project, i) => {
        return (
          <div key={i} className="flex">
            <div>{project.name}</div>
            <div>{project.mint_count}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
