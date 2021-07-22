import { errors } from "../error/error.constants";
import { DatabaseService } from "../services/database.service";
import { updateVaccinationRequest } from "./update.schema";

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
      $set: {
        "cowin.registration": "Y",
        "cowin.beneficiaryId": `**********${beneficiaryId.slice(
          beneficiaryId.length - 4
        )}`,
      },
    }
  );
  if (modifiedCount === 0) {
    throw errors.INVALID_BENEFICIARY_UPDATE;
  }
  return id;
};

export const updateVaccination = async ({
  id,
  batchNumber,
  remarks,
  sideEffects,
}: updateVaccinationRequest): Promise<string> => {
  const db = await DatabaseService.getInstance().getDb("beneficiaries");
  const { modifiedCount } = await db.updateOne(
    {
      id: id,
      "cowin.registration": "Y",
      "status.vaccinated": false,
    },
    {
      $set: {
        "status.vaccinated": true,
        "status.batchNumber": batchNumber,
        "status.sideEffects": {
          occur: sideEffects === "Y" ? true : false,
          remarks: sideEffects === "Y" && remarks ? remarks : "NA",
        },
      },
    }
  );
  if (modifiedCount === 0) {
    throw errors.INVALID_VACCINATION_UPDATE;
  }
  return id;
};
