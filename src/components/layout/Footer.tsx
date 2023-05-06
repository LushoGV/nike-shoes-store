import { TfiTwitterAlt, TfiFacebook, TfiYoutube } from "react-icons/tfi";
import { TiSocialInstagram } from "react-icons/ti";
import { IoLocationSharp } from "react-icons/io5";

const FOOTER_LISTS = [
  {
    allBold: true,
    content: [
      "gift cards",
      "promotions",
      "find a store",
      "sign up for email",
      "become a member",
      "nike journal",
      "send us feedback",
    ],
  },
  {
    allBold: false,
    content: [
      "get help",
      "Order Status",
      "Shipping and Delivery",
      "Returns",
      "Order Cancellation",
      "Payment Options",
      "Gift Card Balance",
      "Contact us",
    ],
  },
  {
    allBold: false,
    content: [
      "about nike",
      "News",
      "Careers",
      "Investors",
      "Purpose",
      "Sustainability",
    ],
  },
];

const SOCIAL_LINKS = [
  {
    link: "",
    text: "Twitter",
    icon: <TfiTwitterAlt />,
  },
  {
    link: "",
    text: "Facebook",
    icon: <TfiFacebook />,
  },
  {
    link: "",
    text: "Youtube",
    icon: <TfiYoutube />,
  },
  {
    link: "",
    text: "Instagram",
    icon: <TiSocialInstagram />,
  },
];

const LAST_LIST = [
  "Guides",
  "Terms of Sale",
  "Terms of Use",
  "Nike Privancy Policy",
];

const Footer = () => {
  return (
    <footer className="w-full bg-black md:px-16 py-8 flex flex-col gap-y-4">
      <div className="w-full max-w-[1920px] mx-auto px-4">
      <section className="grid grid-col-1 lg:grid-cols-2 p-4 gap-y-10 gap-x-16 w-full">
        <div className="grid grid-cols-1 gap-y-7 md:grid-cols-3 w-full">
          {FOOTER_LISTS.map((element, i) => (
            <ul
              key={i}
              className="flex flex-col justify-between gap-y-3 text-xs"
            >
              {element.content.map((item, index) => (
                <li
                  key={index}
                  className={`${
                    element.allBold
                      ? "font-bold uppercase text-white"
                      : index == 0
                      ? "font-bold uppercase text-white"
                      : "text-slate-400"
                  }`}>
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
        
        <ul className="flex lg:justify-end gap-x-4 max-h-[32px]">
          {SOCIAL_LINKS.map((element, index) => (
            <li
              key={index}
              className="text-black bg-slate-400 w-[30] h-[30] rounded-full text-2xl p-1 cursor-pointer"
            >
              <abbr title={element.text}>{element.icon}</abbr>
            </li>
          ))}
        </ul>
      </section>

      <section className="text-slate-400 p-4 grid grid-cols-1 md:grid-cols-2 gap-y-6">
        <div className="flex flex-col md:flex-row gap-x-2 gap-y-2 md:items-end">
          <div className="flex items-center gap-x-2">
            <IoLocationSharp />
            <span className="text-xs">United States</span>
          </div>
          <span className="text-xs ml-6">
            © 2023 Nike, Inc. All Rights Reserved
          </span>
        </div>

        <div className="text-xs flex flex-col gap-y-6 md:items-end">
          <ul className="flex flex-col md:flex-row justify-end gap-x-6 gap-y-2 md:gap-y-0">
            {LAST_LIST.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>

          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row">
            <span className="mr-5">Your Privacy Choices</span>
            <span>CA Supply Chains Act</span>
          </div>
        </div>
      </section>
      </div>
    </footer>
  );
};

export default Footer;
