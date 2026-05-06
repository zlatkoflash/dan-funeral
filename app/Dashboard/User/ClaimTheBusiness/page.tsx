import ModalUserAuth from "@/components/modals/ModalUserAuth/ModalUserAuth";
import ModalUserClaimTheBusiness from "@/components/modals/ModalUserAuth/ModalUserClaimTheBusiness";

export default function ClaimTheBusiness() {
  return <>
    <ModalUserAuth disabledClosing={true} showAlwaysVisible={true}>
      <ModalUserClaimTheBusiness />
    </ModalUserAuth>
  </>
}