import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/store/store";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const GoogleOAuth = () => {
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { setAccessToken } = useStore();
  const queryClient = useQueryClient();

  const currentWorkspace = params.get("currentworkspace");

  React.useEffect(() => {
    const handleLogin = async () => {
      // Try to get token from cookie
      const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
      };
      
      const deleteCookie = (name: string) => {
        document.cookie = `${name}=; max-age=0; path=/`;
      };

      const accessToken = getCookie("auth_token");

      if (accessToken) {
        setAccessToken(accessToken);
        deleteCookie("auth_token"); // Clean up the cookie
        
        await queryClient.refetchQueries({ queryKey: ["authUser"] });

        if (currentWorkspace) {
          navigate(`/workspace/${currentWorkspace}`);
        } else {
          navigate("/");
        }
      }
    };
    handleLogin();
  }, [currentWorkspace, navigate, setAccessToken, queryClient]);


  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo disableLink />
          Pro Mantrix
        </Link>
        <div className="flex flex-col gap-6"></div>
      </div>
      <Card>
        <CardContent>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Authentication Failed</h1>
            <p>We couldn't sign you in with Google. Please try again.</p>

            <Button onClick={() => navigate("/")} style={{ marginTop: "20px" }}>
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleOAuth;
