import ModalForgotPassword from "@/components/modals/ModalUserAuth/ModalForgotPassword";

export default function ForgotPassword() {
  return <>
    <ModalForgotPassword disabledClosing={true} showAlwaysVisible={true} />
  </>
}