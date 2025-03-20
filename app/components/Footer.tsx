import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { MenuType } from "@/types/types";

export default function Footer({ menu }: { menu: MenuType }) {
  if (!menu) return null;
  return (
    <footer className="bg-slate-950">
      <div className="mx-auto px-6 lg:px-8 py-16 sm:py-24 lg:py-32 max-w-7xl">
        <div className="xl:gap-8 border-white/10 xl:grid xl:grid-cols-3 mt-24 pt-12 border-t">
          {menu.imageCloud && (
            <Image
              className="px-12 inline-block"
              src={menu.imageCloud.secure_url}
              alt="logo"
              width={250}
              height={222}
            />
          )}
          {/* Footer Columns */}
          <div className="gap-8 grid grid-cols-1 xl:col-span-2 mt-16 xl:mt-0">
            <div className="md:gap-8 md:grid md:grid-cols-4">
              {menu.footerColumns?.map((column, index) => (
                <div key={index} className={index > 0 ? "mt-10 md:mt-0" : ""}>
                  <h3 className="font-semibold text-sm/6 text-white">
                    {column.title}
                  </h3>
                  <ul role="list" className="space-y-4 mt-6">
                    {column.links?.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        {link.linkType === "internal" ? (
                          <Link
                            href={`/${link.page?.slug?.current || "#"}`}
                            className="text-gray-400 text-sm/6 hover:text-white"
                          >
                            {link.displayName}
                          </Link>
                        ) : (
                          <a
                            href={link.externalUrl}
                            className="text-gray-400 text-sm/6 hover:text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.displayName}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Social Links & Copyright */}
        <div className="md:flex md:justify-between md:items-center border-white/10 mt-12 pt-8 border-t">
          <div className="flex gap-x-6 md:order-2">
            {menu.socialLinks?.map((social, index) => {
              const Icon = {
                Facebook: FaFacebook,
                Instagram: FaInstagram,
                X: FaTwitter,
                GitHub: FaGithub,
                YouTube: FaYoutube,
                LinkedIn: FaLinkedin,
              }[social.platform];

              return Icon ? (
                <a
                  key={index}
                  href={social.url}
                  className="text-gray-400 hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon aria-hidden="true" className="size-6" />
                </a>
              ) : null;
            })}
          </div>

          {menu.copyright && (
            <p className="md:order-1 mt-8 md:mt-0 text-gray-400 text-sm/6">
              {menu.copyright}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
