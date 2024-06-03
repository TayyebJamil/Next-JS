import { Metadata } from "next";
import { title } from "process";
export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Product ${params.productid}`,
  }
}
type Props = {
  params: {
    productid: string
  }
}
export default function ProductDetails({ params }: Props) {
  return (
    <h1>Details About Products {params.productid}</h1>
  )
} 