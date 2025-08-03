import { useEffect } from "react";

const NutritrackRedirect = () => {
  useEffect(() => {
    window.location.replace("https://nutritrack.mynt.studio");
  }, []);
  return null;
};

export default NutritrackRedirect;
