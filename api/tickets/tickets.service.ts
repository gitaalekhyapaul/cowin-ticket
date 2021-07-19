import { DatabaseService } from "../services/database.service";
import { beneficiariesDB } from "../validate/validate.schema";

export const getTickets = async (
  date?: string,
  vaccinated?: boolean,
  revSort?: boolean
): Promise<Array<beneficiariesDB>> => {
  const db = await DatabaseService.getInstance().getDb("beneficiaries");
  const query: { date?: string; vaccinated?: boolean } = {
    ...(date ? { date: date } : {}),
    ...(typeof vaccinated !== "undefined"
      ? { "status.vaccinated": String(vaccinated) === "true" ? true : false }
      : {}),
  };
  const beneficiaries = await db
    .find<beneficiariesDB>(query, {
      sort: {
        id: revSort ? -1 : 1,
      },
      projection: {
        _id: 0,
      },
    })
    .toArray();
  return beneficiaries;
};
