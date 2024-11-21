import Image from "next/image";

export default function Home() {
  return (
    <div className="">

      <div className="md:hidden flex justify-center items-center mt-3">
        <Image src="/images/logo.svg" alt="LOGO image" width={220} height={0} />
      </div>
      <div className="flex justify-around md:justify-around items-center pl-2 pr-2 md:pl-10 md:pr-10 lg:pl-16 lg:pr-16">
        <div className="hidden md:block">
          <Image src="/images/logo.svg" alt="Example image" width={130} height={50} />
        </div>
        <div className="flex">
          <input className="w-64 col-span-8 md:w-96 h-10 mt-2 mb-2 p-2 bg-slate-200 rounded-tl-lg rounded-bl-lg" type="text" placeholder="Find Your Favorite Store" />
          <Image className="col-span-2 bg-slate-200 pr-2 h-10 mt-2 mb-2 rounded-tr-lg rounded-br-lg " id="search_box" src="/images/search_icon.svg" alt="Example image" width={30} height={30} />
        </div>
        <div className="hidden sm:block">
          <div className="flex">
            <p className="text-2xl">0</p>
            <Image src="/images/cart.svg" alt="Example image" width={35} height={35} />
          </div>
        </div>
        <div className="hidden lg:block cursor-pointer  border-black border hover:bg-gray-300 hover:border-none p-2 rounded">
          Become a Seller
        </div>
        <div className="hidden lg:block cursor-pointer  border-black border hover:bg-gray-300 hover:border-none p-2 rounded">
          Login & Signup
        </div>
        <div>
          <div className="cursor-pointer  border-black border rounded  hover:bg-gray-300">
            <Image src="/images/hamburger.svg" alt="Example image" width={35} height={35} />
          </div>
          <ul className="block">
            <li>Support</li>
            <li>FAQs</li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
