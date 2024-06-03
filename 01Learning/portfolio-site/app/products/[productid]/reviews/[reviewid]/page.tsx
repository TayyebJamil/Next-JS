import { notFound } from "next/navigation"
export default function ReviewDetail({ params }: {
  params: {
    productid: string
    reviewid: string
  }
}) {
  if (parseInt(params.reviewid) > 50) {
    notFound();
  }
  return (
    <h1>Review {params.reviewid} for Product {params.productid}</h1>
  )
}