import Ticket from "../components/Ticket";
import Protected from "../components/Protected";

export default function Home() {
  return (
    <>
      <Protected>
        <Ticket />
      </Protected>
    </>
  );
}
