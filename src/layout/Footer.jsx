import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="font-bold font-montserrat">
      <div className="flex flex-col m-20 gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-[#252B42]">Get In Touch</h3>
          <p className="text-[#737373] ">
            the quick fox jumps over the lazy dog
          </p>
          <div className="flex text-[#23A6F0] gap-4">
            <Facebook />
            <Instagram />
            <Twitter />
          </div>
        </div>
        <div>
          <h3 className="text-[#252B42]">Company Info</h3>
          <ul className="text-[#737373] leading-8">
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h3 className="text-[#252B42]">Features</h3>
          <ul className="text-[#737373] leading-8">
            <li>Business marketing</li>
            <li>User Analytic</li>
            <li>Live Chat</li>
            <li>Unlimited Support</li>
          </ul>
        </div>
      </div>
      <div className="m-6 text-[#737373] text-center">
        <p>Made With Love By Figmaland All Right Reserved</p>
      </div>
    </footer>
  );
}
