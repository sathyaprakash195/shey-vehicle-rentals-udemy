import React from "react";
import { Drawer } from "antd";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

interface AuthenticationProps {
  showAuthentication: boolean;
  setShowAuthentication: (value: boolean) => void;
}

function Authentication({
  showAuthentication,
  setShowAuthentication,
}: AuthenticationProps) {
  const searchParams = useSearchParams();

  const showSignUp = searchParams.get("formType") === "signup";

  return (
    <Drawer
      open={showAuthentication}
      onClose={() => setShowAuthentication(false)}
      width={550}
      className="flex justify-center w-full"
    >
      <div className="flex justify-center">
        {showSignUp ? (
          <SignUp
            routing="hash"
            signInUrl="/?formType=signin"
            fallbackRedirectUrl="/vehicles"
          />
        ) : (
          <SignIn
            routing="hash"
            signUpUrl="/?formType=signup"
            fallbackRedirectUrl="/vehicles"
          />
        )}
      </div>
    </Drawer>
  );
}

export default Authentication;
