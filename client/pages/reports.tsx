import Reports from "../components/Reports";
import Protected from "../components/Protected";

export default function Report() {
  return (
    <>
      <Protected>
        <Reports />
      </Protected>
    </>
  );
}
