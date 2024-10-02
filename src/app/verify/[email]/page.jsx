import VerifyOtp from "@/components/VerifyOtp";

function Page({ params }) {
  return <VerifyOtp email={params.email} />;
}

export default Page;
