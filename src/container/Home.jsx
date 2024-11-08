import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { FaSearchengin } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link, Routes, Route, useNavigate } from "react-router-dom"; 
import { Logo } from "../assets";
import { MdHome } from "react-icons/md";
import { Projects, SignUp } from "../container";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileDetails } from "../components";
import { SET_SEARCH_TERM } from "../context/actions/searchActions";
import Chatbot from "../components/chatbot";

const Home = () => {
  const [isSideMenu, setIsSideMenu] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
  );
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  return (
    <>
      <div
        className={`w-2 ${
          isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.2]"
        } min-h-screen max-h-screen relative bg-secondary px-3 py-4 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideMenu(!isSideMenu)}
          className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer"
        >
          <HiChevronDoubleLeft className="text-white text-lg" />
        </motion.div>
        <div className="overflow-hidden w-full flex flex-col gap-3">
          <Link to={"/home"}>
            <img src={Logo} alt="logo" className="object-contain w-48 h-auto" />
          </Link>
          <Link to={"/newProject"}>
            <div className="px-6 py-2 flex items-center justify-center rounded-xl border-2 border-gray-500 cursor-pointer group hover:border-gray-200 animate-border-spin md:rounded-lg text-lg">
              <p className="text-gray-300 group-hover:text-gray-200 capitalize">Start Coding</p>
            </div>
          </Link>
          {user && (
            <Link to={"/home/projects"} className="flex items-center justify-center gap-4">
              <MdHome className="text-primaryText text-lg" />
              <p className="text-base text-primaryText">Home</p>
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1 min-h-screen max-h-screen overflow-y-auto h-full flex flex-col items-start justify-start px-2 md:px-8 py-4 md:py-4">
        {/* Top Section */}
        <div className="w-full flex items-center justify-between gap-3">
          {/* Search */}
          <div className="bg-secondary w-full px-4 py-2 rounded-md flex justify-center items-center gap-3">
            <FaSearchengin className="text-xl text-primaryText" />
            <input
              type="text"
              value={searchTerm}
              className="flex-1 px-3 py-1 text-base bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600"
              placeholder="Search Projects..."
              onChange={(e) => dispatch(SET_SEARCH_TERM(e.target.value))}
            />
          </div>
          {/* Profile Section */}
          {!user && (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center gap-3"
            >
              <button
                onClick={() => navigate("/home/auth")}
                className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white px-4 py-2 rounded-md transition-all duration-150"
              >
                SignUp
              </button>
            </motion.div>
          )}
          {user && <UserProfileDetails />}
        </div>
        {/* Bottom Section */}
        <div className="w-full mt-4">
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
          </Routes>
        </div>
        {/* Chatbot Button */}
        <div className="fixed bottom-4 right-6">
          <button
            onClick={() => setIsChatbotVisible(!isChatbotVisible)}
            className="bg-emerald-500 text-white px-3 py-2 rounded-full shadow-md hover:bg-emerald-600 transition-all duration-150"
          >
            Chat
          </button>
        </div>
        {/* Chatbot Component */}
        {isChatbotVisible && <Chatbot onClose={() => setIsChatbotVisible(false)} />}
      </div>
    </>
  );
};

export default Home;
