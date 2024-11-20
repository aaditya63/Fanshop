import Image from "next/image";

export default function Home() {
  return (
    <div>
      <nav>
        <div>
          <Image src="/images/logo.png" alt="Example image" width={130} height={50} />
        </div>
        <div>
          <input type="text" placeholder="Find Your Favorite Store" />
          <Image id="search_box" src="/images/search_icon.svg" alt="Example image" width={130} height={50} />
        </div>
        <div>
        <Image id="search_box" src="/images/cart.svg" alt="Example image" width={50} height={50} />
        </div>
        <div>
        Login & Signup
        </div>
      </nav>
    </div>
  );
}
