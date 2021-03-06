import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Select from "./Select";
import { useFormikContext } from "formik";
import { TicketSchema } from "../../utils/schema";

const PincodeSelect = () => {
  const [options, setOptions] = useState<
    Array<{ name: string; value: string }>
  >([]);
  const { values } = useFormikContext<TicketSchema>();
  const { pincode } = values;
  useEffect(() => {
    async function getOptions() {
      try {
        const newOptions: Array<{ name: string; value: string }> = [
          { name: "Select Option", value: "" },
        ];
        if (/^[1-9]{1}[0-9]{5}$/.test(pincode)) {
          const { data } = await axios.get(
            `https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=${process.env.NEXT_PUBLIC_API_KEY}&format=json&skip=0&limit=100&filters[pincode]=${pincode}`
          );
          if (data.records) {
            data.records.map((record: { officename: string }) => {
              newOptions.push({
                name: record.officename,
                value: record.officename,
              });
            });
          }
        }
        setOptions(newOptions);
      } catch (err) {
        toast.error("Error fetching P.O List!");
        console.dir(err.response);
      }
    }
    getOptions();
  }, [pincode]);
  return (
    <>
      <Select label="Post Office" name="po">
        {options.map((val, index) => {
          return (
            <option key={index} value={val.value}>
              {val.name}
            </option>
          );
        })}
      </Select>
    </>
  );
};

export default PincodeSelect;
