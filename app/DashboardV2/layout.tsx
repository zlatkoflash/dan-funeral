import { ModalPackages } from "./DashboardComponents/Modals/ModalPackages";
import ModalUpgradeThePlan from "./DashboardComponents/Modals/ModalUpgradeThePlan";
import ModalProfileEditor from "./DashboardComponents/ProfileEditor/ModalProfileEditor";

export default async function DashboardV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ModalUpgradeThePlan />
      <ModalPackages />
      <ModalProfileEditor />
    </>
  );
}