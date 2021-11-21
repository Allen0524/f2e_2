import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-primary w-full h-9 absolute top-0 z-30 lg:h-20">
      <div className="ml-5">
        <img src="/Logo.svg" alt="logo" className="cursor-pointer h-4 lg:h-8" />
      </div>
      <div className="mr-5">
        <FontAwesomeIcon
          icon={faBars}
          className="h-4 text-white cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
