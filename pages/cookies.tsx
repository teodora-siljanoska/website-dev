import React from "react";
import { hasCookie, setCookie } from "cookies-next";

const CookieConsent = (props:any) => {
  const [showConsent, setShowConsent] = React.useState(true);

  React.useEffect(() => {
    setShowConsent(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true", {});
  };

  if (showConsent) {
    return null;
  }

  return (
    <div className="fixed  z-50">
      <div className="fixed inset-x-4 bottom-4 flex items-center justify-between rounded-md bg-purple px-10 py-8">
        <span className="mr-16 font-['Mont-semibold'] text-lg text-white">
          This website uses cookies to improve user experience. By using our website you consent to all cookies in accordance with our Cookie Policy.
        </span>
        <button className="justify-center rounded-full border-2  border-darkTeal  bg-darkTeal px-[42px] py-[12px]  font-['Mont-semibold'] text-white transition duration-500 hover:border-2 hover:border-lightTeal hover:bg-lightTeal hover:text-white" onClick={() => acceptCookie()}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;