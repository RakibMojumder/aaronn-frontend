import { Facebook, Twitter, Instagram } from "lucide-react";
import logo from "../../../public/assets/logo.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-24 bg-[#131313] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-primary font-semibold mb-4">
            Get in Touch With Us
          </h2>
          <a
            href="mailto:info@aaronn.com"
            className="text-3xl font-bold hover:text-orange-500 transition-colors"
          >
            info@aaronn.com
          </a>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-12">
          <Image src={logo} alt="logo" height={150} width={150} />
          <div className="text-gray-400 mb-4 md:mb-0">
            Street Avenue 21, CA
            <br />
            0-0-00-888-000
          </div>

          <div>
            <h3>+9 05934 2492</h3>
            <div className="flex gap-4 mt-3">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm mt-12">
          © 2023. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
