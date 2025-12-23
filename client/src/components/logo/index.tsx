
import { Link } from "react-router-dom";

const Logo = (props: { url?: string; disableLink?: boolean }) => {
  const { url = "/", disableLink = false } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      {disableLink ? (
        <div className="flex h-6 w-6 items-center justify-center rounded-md">
          <img src="/logo.png" alt="Pro Mantrix" className="size-6 object-contain" />
        </div>
      ) : (
        <Link to={url}>
          <div className="flex h-6 w-6 items-center justify-center rounded-md">
            <img src="/logo.png" alt="Pro Mantrix" className="size-6 object-contain" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Logo;
