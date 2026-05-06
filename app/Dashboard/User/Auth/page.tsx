// "use server";

import ModalUserAuth from "@/components/modals/ModalUserAuth/ModalUserAuth";
import Link from "next/link";

export default async function UserAuth() {

  console.log("I am there....");

  return (<>

    {
      /*<div className="login page">
      User Login
      <ul>
        <li>
          <Link href="/Dashboard/User/Login">Login</Link>
        </li>
        <li>
          <Link href="/Dashboard/User/SignUp">Sign Up</Link>
        </li>
      </ul>
    </div>*/
    }

    <ModalUserAuth disabledClosing={true} showAlwaysVisible={true} />

  </>)
}