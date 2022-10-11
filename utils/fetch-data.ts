import axios from "axios";

import { Project } from "./types";

const query = {
  sql: `SELECT name, c.contract_address, standard, external_url, image_url, opensea_url, a.mint_count
					FROM ethereum.collections AS c
					RIGHT JOIN (
						SELECT contract_address, COUNT(*) AS mint_count FROM ethereum.nft_transfers
						WHERE category = 'mint'
						AND timestamp >= NOW() - INTERVAL '5 MIN'
						GROUP BY contract_address
						ORDER BY mint_count DESC
						LIMIT 10
					) AS a
					ON c.contract_address = a.contract_address;`,
};

export const fetchData = async (): Promise<Project[]> => {
  try {
    const { data } = await axios.post("https://sql.transpose.io", query, {
      headers: {
        "X-API-KEY": process.env.TRANSPOSE_API_KEY,
      },
    });

    return data.results as Project[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
