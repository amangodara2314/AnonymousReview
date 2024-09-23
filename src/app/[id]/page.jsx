import SubmitReview from "@/components/SubmitReviews";

function Page({ params }) {
  return <SubmitReview id={params.id} />;
}

export default Page;
