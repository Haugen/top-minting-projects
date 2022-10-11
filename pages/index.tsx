import Image from "next/future/image";
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
      staleTime: 3000,
      refetchInterval: 3000,
    }
  );

  if (!data) return null;

  return (
    <div className="m-10">
      <h1 className="text-8xl uppercase">Top Minters</h1>
      <p className="my-10 text-2xl">
        Top minting projects on the Ethereum blockchain in the last five
        minutes.
      </p>
      {data?.map((project, i) => {
        return (
          <div key={i} className="flex mb-10">
            <div className="w-[150px] h-[150px] mr-10">
              {project.image_url && (
                <Image
                  className="rounded-full"
                  src={project.image_url}
                  width={150}
                  height={150}
                  alt=""
                />
              )}
            </div>
            <div>
              <h2 className="text-2xl">{project.name}</h2>
              <div className="text-5xl">{project.mint_count}</div>
              <div className="text-sm">{project.standard}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
