import PostReviews from "@/components/PostReviews";

function Page({ params }) {
  return <PostReviews id={params.id} />;
}

export default Page;
