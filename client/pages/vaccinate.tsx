import Vaccinate from "../components/Vaccinate";
import { TabContextProvider } from "../components/Stores/TabContext";

const Vaccine = () => {
  return (
    <>
      <TabContextProvider>
        <Vaccinate />
      </TabContextProvider>
    </>
  );
};

export default Vaccine;
