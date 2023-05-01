import Image from "next/image";
import Button from "../Button";
import emptyCart from "../../assets/empty-cart.jpg";
import { useRouter } from "next/router";

type Props = {};

const EmptyCart = (props: Props) => {
  const router = useRouter()
  
  return (
    <>
      <Image
        alt="empty cart"
        src={emptyCart}
        width={350}
        height={100}
        className="m-auto"
      />
      <section className="max-w-sm mx-auto flex flex-col gap-y-3">
        <h2 className="text-2xl font-semibold mx-auto">Your cart is empty</h2>

        <p className="text-center">
          Looks like you have not added anything in your cart. Go ahead and
          explore top categories
        </p>

        <div className="max-w-[230px] w-full mx-auto mt-2">
          <Button text="Continue Shopping" black onClick={() => router.push("/")} />
        </div>
      </section>
    </>
  );
};

export default EmptyCart;
