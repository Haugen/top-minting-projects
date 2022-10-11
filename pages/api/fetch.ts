import type { NextApiRequest, NextApiResponse } from "next";

import { fetchData } from "../../utils/fetch-data";
import { Project } from "../../utils/types";

type Data = {
  data: Project[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const result = await fetchData();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).write("Oops");
  }
}
