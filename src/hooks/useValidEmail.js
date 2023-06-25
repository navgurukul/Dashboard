import { useEffect, useState } from "react";

const useValidEmail = (email) => {
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  return { isValidEmail };
};

export default useValidEmail;
