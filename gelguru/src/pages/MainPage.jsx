
import React from "react";
import styles from "../modules/mainPage.module.css";
import { useEffect, useState } from "react";

import Chart from "../components/Chart";
import { useNavigate } from "react-router";
import logoutIcon from "/images/logout.svg";
import rightIcon from "/images/right.svg";
import logoIcon from "/images/logo.svg";
import userIcon from "/images/user.svg";
import attributeIcon from "/images/attribute.svg";
import { useAuth } from "../context/useAuth";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import AddGoal from "../components/AddGoal";
import GoalList from "../components/GoalList";


console.log(React)

const MainPage = () => {
  const navigate = useNavigate()
  const [percentage] = useState(0);
  const [inputValues, setInputValues] = useState(Array(6).fill({ value: "0" }));
  const [goals, setGoals] = useState([]);



  const [deleteModalHandler, setDeleteModalHandler] = useState(false);
  const [userView, setUserView] = useState(false);
  const [mainPosition, setMainPosition] = useState(0);
  const [addGoalToggle, setAddGoalToggle] = useState(false);
  const [footerStyle, setFooterStyle] = useState({});


  const [indexToDelete, setIndexToDelete] = useState(0);
  const { logoutUser, user } = useAuth()

  useEffect(() => {
    setMainPosition(percentage * 10.7);
    setInputValues((prevState) => {
      const newState = [...prevState];
      const totalAmount = Number(newState[1].value.trim());
      const calculatedSaved = (totalAmount * percentage) / 100;
      newState[3] = { value: calculatedSaved.toFixed(2) };
      newState[4] = { value: (totalAmount - calculatedSaved).toFixed(2) };
      return newState;
    });
  }, [percentage]);

  console.log(setIndexToDelete, setFooterStyle, inputValues, mainPosition)


  const userModalHandler = () => {
    setUserView(!userView);
  };

  const deleteModal = () => {
    setDeleteModalHandler(!deleteModalHandler);
  };

  const navigateHandler = (url) => {
    navigate(`/home/${url}`);
  };

  const goalToggleHandler = () => {
    setAddGoalToggle(!addGoalToggle);
  };


  const deleteHandler = (index) => {
    const newArr = goals.filter((element, i) => i !== index);
    setGoals(newArr);
    setDeleteModalHandler(false);
  };

  function handleLogout(e) {
    e.preventDefault()

    logoutUser()
    navigate('/signin')
  }

  return (
    <div className={styles.container}>
      {deleteModalHandler && (
        <div className={styles["delete-modal"]}>
          <p>Are u sure you want to perform the action</p>
          <div>
            <button
              onClick={() => {
                deleteHandler(indexToDelete);
              }}
            >
              Yes
            </button>
            <button onClick={deleteModal}>No</button>
          </div>
        </div>
      )}
      <div className={styles.header}>
        <div className={styles.logoSide}>
          <img src={logoIcon} alt="" />
          <h1>
            <span>G</span>el<span>G</span>uru
          </h1>
        </div>
        <div className={styles.headerTitle}>
          <div>
            <p>Income & Expenses</p>
            <div className={styles.orangeBar}></div>
          </div>
          <div>
            <p>Goals</p>
            <div className={styles.orangeBar2}></div>
          </div>
        </div>
        <div className={styles.userSide}>
          <p>Hello, {user?.first_name && user.first_name}</p>
          <div>
            <img
              src={userIcon}
              alt=""
              className={styles.userImg}
              onClick={userModalHandler}
            />
            <img
              src={attributeIcon}
              alt=""
              className={styles.attribute}
              onClick={userModalHandler}
            />
          </div>
        </div>
        {userView && (
          <div className={styles["profileModal"]}>
            <div onClick={() => navigateHandler("profile")}>
              <img src={userIcon} alt="" />
              <p>View Profile</p>
            </div>
            <div onClick={handleLogout}>
              <img src={logoutIcon} alt="" />
              <span>Log Out</span>
            </div>
          </div>
        )}
      </div>
      {/* <div className={styles.incomePlace}>
        <Chart />
      </div> */}
      <Chart />

      <div className="px-28 py-12 flex justify-center items-center flex-col">
        <div className="m-auto w-full flex justify-between">
          <p className="font-semibold text-2xl">Financial goals</p>
          <p className="font-semibold text-2xl flex items-center gap-2 text-green-500">
            <p>Add goal</p>
            <button onClick={() => goalToggleHandler()}>
              <HiOutlinePlusCircle className="text-4xl" />
            </button>
          </p>
        </div>
        <div className="m-auto w-full">
          {addGoalToggle && <AddGoal />}
          {addGoalToggle && <GoalList />}
        </div>
      </div>

      <div className={styles.footer} style={footerStyle}>
        <div className={styles.footerLogo}>
          <img src={logoIcon} alt="" />
          <h1>
            <span>G</span>el<span>G</span>uru
          </h1>
        </div>
        <div className={styles.footerText}>
          <div className={styles.footerTitle}>
            <p onClick={() => navigateHandler("expenses")}>How It Works</p>
            <p onClick={() => navigateHandler("safety")}>
              Safety & Confidentiality
            </p>
            <p onClick={() => navigateHandler("contact")}>Contact</p>
          </div>
          <div className={styles.rights}>
            <img src={rightIcon} alt="" />
            <p>SkillTeam. All Rights Reserved.</p>
          </div>
        </div>
        <div className={styles.whiteSubject}></div>
      </div>
    </div>
  );
};

export default MainPage;
