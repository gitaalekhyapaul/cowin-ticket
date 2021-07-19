import { errors } from "../error/error.constants";
import { DatabaseService } from "../services/database.service";

export const updateBeneficiary = async (
  id: string,
  beneficiaryId: string
): Promise<string> => {
  const db = await DatabaseService.getInstance().getDb("beneficiaries");
  const { modifiedCount } = await db.updateOne(
    {
      "cowin.registration": "N",
      id: id,
    },
    {
      $set: { "cowin.registration": "Y", "cowin.beneficiaryId": beneficiaryId },
    }
  );
  if (modifiedCount === 0) {
    throw errors.INVALID_BENEFICIARY_UPDATE;
  }
  return id;
};
