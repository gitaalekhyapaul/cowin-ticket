import React, { useEffect, useState } from "react";
import axios from "axios";

import Select from "./Select";

const PincodeSelect = ({ getPincode, ...props }: { [x: string]: any }) => {
  const [options, setOptions] = useState<
    Array<{ name: string; value: string }>
  >([]);
  useEffect(() => {
    async function getOptions() {
      try {
        const newOptions: Array<{ name: string; value: string }> = [
          { name: "Select Option", value: "" },
        ];
        if (/^7[0-9]{5}$/.test(getPincode)) {
          const { data } = await axios.get(
            `https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=${process.env.NEXT_PUBLIC_API_KEY}&format=json&skip=0&limit=100&filters[pincode]=${getPincode}`
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
        console.dir(err);
      }
    }
    getOptions();
  }, [getPincode]);
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
