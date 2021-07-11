import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  beneficiaryId: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.dir(req.body);
  res
    .status(200)
    .json({ success: true, beneficiaryId: "abcd-abcd-abcd-abcd-abcd" });
};
export default handler;
