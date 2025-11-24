import Image from "next/image";
import Link from "next/link";

import flag from './../../assets/images/icon-flag.svg';

export default function FlagVerify() {
  return <section className="flag-verify">
    <Image src={flag} alt="Flag" />
    <span className="question">Is this your business?</span>
    <Link href="/" className="verify-link">Verify it today.</Link>
  </section>
}