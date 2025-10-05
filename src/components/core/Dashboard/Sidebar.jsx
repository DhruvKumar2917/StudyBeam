// import { useState } from "react"
// import { VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { sidebarLinks } from "../../../data/dashboard-links"
// import { logout } from "../../../services/operations/authAPI"
// import ConfirmationModal from "../../Common/ConfirmationModal"
// import SidebarLink from "./SidebarLink"

// export default function Sidebar() {
//   const { user, loading: profileLoading } = useSelector(
//     (state) => state.profile
//   )
//   const { loading: authLoading } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   // to keep track of confirmation modal
//   const [confirmationModal, setConfirmationModal] = useState(null)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
//         <div className="flex flex-col">
//           {sidebarLinks.map((link) => {
//             if (link.type && user?.accountType !== link.type) return null
//             return (
//               <SidebarLink key={link.id} link={link} iconName={link.icon} />
//             )
//           })}
//         </div>
//         <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
//         <div className="flex flex-col">
//           <SidebarLink
//             link={{ name: "Settings", path: "/dashboard/settings" }}
//             iconName="VscSettingsGear"
//           />
//           <button
//             onClick={() =>
//               setConfirmationModal({
//                 text1: "Are you sure?",
//                 text2: "You will be logged out of your account.",
//                 btn1Text: "Logout",
//                 btn2Text: "Cancel",
//                 btn1Handler: () => dispatch(logout(navigate)),
//                 btn2Handler: () => setConfirmationModal(null),
//               })
//             }
//             className="px-8 py-2 text-sm font-medium text-richblack-300"
//           >
//             <div className="flex items-center gap-x-2">
//               <VscSignOut className="text-lg" />
//               <span>Logout</span>
//             </div>
//           </button>
//         </div>
//       </div>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }



import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../Common/ConfirmationModal";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mobile toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Confirmation modal state
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="absolute top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-richblack-700 p-2 rounded-full text-white"
        >
          {isSidebarOpen ? "←" : "→"}
        </button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-richblack-800 py-10 border-r border-r-richblack-700 transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative md:h-[calc(100vh-3.5rem)] md:w-[220px]`}
      >
        <div className="flex flex-col h-full justify-between">
          {/* Sidebar links */}
          <div className="flex flex-col">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return <SidebarLink key={link.id} link={link} iconName={link.icon} />;
            })}
          </div>

          {/* Divider */}
          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          {/* Settings + Logout */}
          <div className="flex flex-col">
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => {
                    dispatch(logout(navigate));
                    setIsSidebarOpen(false); // close sidebar on mobile
                  },
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="px-8 py-2 text-sm font-medium text-richblack-300"
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
