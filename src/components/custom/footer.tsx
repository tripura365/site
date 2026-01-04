import { getCategoryWiseNews } from "@/actions/news";
import { Facebook, Mail, MapPin } from "lucide-react";
import Logo from "./logo";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default async function Footer() {
  const categoryResponse = await getCategoryWiseNews();
  const importantLinks = [
    {
      imageUrl: "https://india.gov.in/image/static/npi_logo_Beta_White.svg",
      webUrl: "https://www.india.gov.in",
      bgColor: "black",
      name: "National Portal of India",
    },
    {
      imageUrl:
        "https://www.tripura.gov.in/sites/default/files/2023-07/logo-ripura_0_0.png",
      webUrl: "https://www.tripura.gov.in",
      name: "Government of Tripura",
    },
    {
      imageUrl:
        "https://www.mygov.in/sites/all/themes/mygov/front_assets/images/logo.svg",
      webUrl: "https://www.mygov.in",
      name: "MyGov",
    },
    {
      imageUrl:
        "https://s7ap1.scene7.com/is/content/incredibleindia/incredible-india-logo?qlt=82&ts=1727762218512",
      webUrl: "https://www.incredibleindia.gov.in/en",
      bgColor: "black",
      name: "Incredible India",
    },
    {
      imageUrl:
        "https://ica.tripura.gov.in/sites/default/files/2022-01/ica.png",
      webUrl: "https://ica.tripura.gov.in",
      name: "ICA Tripura",
    },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Section (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-block">
              <Logo />
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Tripura 365 is a dynamic and trusted Indian news website that
              brings you the latest and most relevant news from the vibrant
              state of Tripura.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href={"https://www.facebook.com//profile.php?id=61581880808522"}
                target="_blank"
                className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group"
              >
                <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                href={"https://www.instagram.com/tripura365webmedia/"}
                target="_blank"
                className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300 group"
              >
                <FaInstagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-600 rounded-full"></span>
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {importantLinks.map((impLink) => (
                <a
                  key={impLink.webUrl}
                  href={impLink.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-900 transition-colors group"
                >
                  <div
                    className="h-14 md:w-64 w-full flex items-center justify-center rounded p-1"
                    style={{ backgroundColor: impLink.bgColor ?? "white" }}
                  >
                    <img
                      src={impLink.imageUrl}
                      alt={impLink.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  {/* <span className="text-sm font-medium group-hover:text-white transition-colors">{impLink.name}</span> */}
                </a>
              ))}
            </div>
          </div>

          {/* Categories (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Categories
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-600 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {categoryResponse.data?.map((category) => (
                <li key={category.articles?.[0]?.category.id ?? Date.now()}>
                  <Link
                    href={`/category/${category?.articles?.[0]?.category.id}`}
                    className="text-sm md:text-base hover:text-red-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-700 rounded-full group-hover:bg-red-500 transition-colors" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-600 rounded-full"></span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="mt-1 p-2 bg-gray-900 rounded-lg group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-0.5">
                    Email
                  </span>
                  <Link
                    href={"mailto:tripura365.agt@gmail.com"}
                    className="hover:text-white transition-colors"
                  >
                    tripura365.agt@gmail.com
                  </Link>
                  <Link
                    href={"mailto:priyankumodak.agt25@gmail.com"}
                    className="hover:text-white transition-colors"
                  >
                    priyankumodak.agt25@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="mt-1 p-2 bg-gray-900 rounded-lg group-hover:bg-green-600/20 group-hover:text-green-500 transition-colors">
                  <FaWhatsapp className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-0.5">
                    WhatsApp
                  </span>
                  <a href="https://wa.me/919233749847">
                    <span className="hover:text-white transition-colors">
                      +91 92337 49847
                    </span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="mt-1 p-2 bg-gray-900 rounded-lg group-hover:bg-blue-600/20 group-hover:text-blue-500 transition-colors">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-0.5">
                    Address
                  </span>
                  <span className="hover:text-white transition-colors">
                    AD Nagar, Agartala, 799003
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">Tripura 365</span>. All
            rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Advertise with Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
