import { JSX } from "react";

const Footer = (): JSX.Element => {
  return (
    <div className="p-3.5 w-full h-24 flex flex-col gap-2 border-t border-primary bg-card">
      <h3 className="text-titleH3 text-text">Remove backround image</h3>
      <div>
        <p className="text-text">
          Process :{" "}
          <a
            className="no-underline text-white/65 hover:text-primary"
            href="https://github.com/imgly/background-removal-js"
            target="_blank"
          >
            IMG.LY remove backround image
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
