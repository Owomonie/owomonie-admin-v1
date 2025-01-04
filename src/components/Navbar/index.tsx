import { useSelector } from "react-redux";

import { UserDetails } from "../../utils/types";
import { RootState } from "../../redux/store";
import RightNavbar from "./right-nav";

const Navbar: React.FC = () => {
  const user = useSelector(
    (state: RootState) => state.userDetails.data as UserDetails
  );

  return (
    <div className="border-b border-[#D3D3D3] py-4 px-6 flex justify-between items-center fixed top-0 right-0 left-[250px] bg-white z-10">
      <div>
        <p className="font-[450] text-[#151515] text-[19px]">
          {user.firstName} {user.lastName}
        </p>
        <small className="font-[350] text-[#5F5F5F] text-[12px]">
          SUPER ADMIN!
        </small>
      </div>
      <RightNavbar />
    </div>
  );
};

export default Navbar;
