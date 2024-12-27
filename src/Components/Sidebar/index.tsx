import { NavLink } from "react-router-dom";
import { SidebarData } from "./data";

const logoImage = new URL("../../assets/logo/white-logo.png", import.meta.url)
  .href;

const Sidebar: React.FC = () => {
  return (
    <div className="w-[250px] bg-[#010D14] fixed top-0 bottom-0 py-10 px-8">
      <div className="flex gap-2 items-center mb-16">
        <img
          src={logoImage}
          alt="logo"
          className="w-8 h-8"
        />
        <h1 className="text-[#F4F9FF] font-poppins font-bold text-2xl">
          OwoMonie
        </h1>
      </div>
      <p className="text-[#FCFCFC] font-[550] text-xs">MENU</p>
      <div className="mt-10 flex flex-col gap-10">
        {SidebarData.map((item) => (
          <NavLink
            to={item.link}
            key={item.title}
            className={({ isActive }) =>
              `flex items-center gap-2 font-[350] ${
                isActive ? "text-[#EBF73E]" : "text-[#B2B2B2]"
              }`
            }>
            {({ isActive }) => (
              <div className="flex items-center gap-2">
                <img
                  src={isActive ? item.focusedIcon : item.unfocusedIcon}
                  alt={item.title}
                  className="w-5 h-5"
                />
                <h2 className="text-[15px]">{item.title}</h2>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
