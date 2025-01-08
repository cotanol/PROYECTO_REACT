import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4 font-body font-normal">
      <div className="container mx-auto flex flex-col gap-6 px-4 md:px-10 pb-11">
        <Logo />
        <p className="text-sm">
          We have clothes that suits your style and which you’re proud to wear.
          From women to men.
        </p>
        <div className="flex gap-4">
          <img src="/twitter-logo.png" />
          <img src="/facebook-logo.png" />
          <img src="/instagram-logo.png" />
          <img src="./github-logo.png" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
          <div>
            <h3 className="font-medium tracking-widest">COMPANY</h3>
            <p className="text-sm">About</p>
            <p className="text-sm">Features</p>
            <p className="text-sm">Works</p>
            <p className="text-sm">Career</p>
          </div>
          <div>
            <h3 className="font-medium tracking-widest">HELP</h3>
            <p className="text-sm">Customer Support</p>
            <p className="text-sm">Delivery Details</p>
            <p className="text-sm">Terms & Conditions</p>
            <p className="text-sm">Privacy Policy</p>
          </div>
          <div>
            <h3 className="font-medium tracking-widest">FAQ</h3>
            <p className="text-sm">Account</p>
            <p className="text-sm">Manage Deliveries</p>
            <p className="text-sm">Orders</p>
            <p className="text-sm">Payment</p>
          </div>
          <div>
            <h3 className="font-medium tracking-widest">RESOURCES</h3>
            <p className="text-sm">Free eBook</p>
            <p className="text-sm">Development Tutorial</p>
            <p className="text-sm">How to - Blog</p>
            <p className="text-sm">Youtube Playlist</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-solid border-gray-500 pt-10">
          <p className="text-center text-sm">
            © 2000-2023 SHOP.CO. All Rights Reserved
          </p>
          <div className="flex justify-center">
            <img src="/visa-logo.png" />
            <img src="/mastercard-logo.png" />
            <img src="/paypal-logo.png" />
            <img src="/applepay-logo.png" />
            <img src="/googlepay-logo.png" />
          </div>
        </div>
      </div>
    </footer>
  );
}
