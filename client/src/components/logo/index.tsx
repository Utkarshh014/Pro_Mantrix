import { AudioWaveform } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = (props: { url?: string; disableLink?: boolean }) => {
  const { url = "/", disableLink = false } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      {disableLink ? (
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <AudioWaveform className="size-4" />
        </div>
      ) : (
        <Link to={url}>
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <AudioWaveform className="size-4" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Logo;
