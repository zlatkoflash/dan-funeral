import { getApiData } from "@/utils/api";
import AdminContentWrap from "../../content/AdminContentWrap";
import FormSearch from "@/components/forms/ReadyForms/FormSearch";

export default async function VerifyEmail({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

  const params = await searchParams;

  const resultsVerification = await getApiData("/user/VerifyEmailAddress", "POST", {
    tokenForVerification: params.token
  });

  console.log("resultsVerification:", resultsVerification);

  return (
    <AdminContentWrap subHeadSearchSettings={{
      breads: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Dashboard",
          link: "/dashboard",
        },
        {
          label: "Verify Email",
          link: "/dashboard/user-actions/verify-email",
        },
      ],
      title: "Verify Email",
      right_content: <FormSearch buttonSearchType="btn-text" />
    }}>
      {
        resultsVerification.ok === true ?
          <div className="request-quote-info-text">
            <h4>✅ Verification Email</h4>
            <p>Thank you for verifying your email address.</p>
          </div>
          :
          <div className="request-quote-info-text">
            <h4>❌ Verification Failed</h4>
            <p>The token is not valid or has expired.</p>
          </div>
      }

    </AdminContentWrap>
  );
}