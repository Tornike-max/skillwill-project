import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../modules/reset.module.css";

import checkIcon from "/assets/check.png"
import circleIcon from "/assets/circle.png"
import errorIcon from "/assets/error.png"
import guruIcon from "/assets/guru.png";
import { useForgorPassword } from "../hooks/useForgotPassword";
import { Button } from "@nextui-org/button";

const Reset = () => {
  const { mutate, isPending } = useForgorPassword()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [firstPasswordClicked, setFirstPasswordClicked] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState("");

  const handleTogglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleFirstPasswordClick = () => {
    setFirstPasswordClicked(true);
  };

  const hanldePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleReenteredPassword = (e) => {
    setReenteredPassword(e.target.value);
  };

  const ifPswIsCapital = /[A-Z]/.test(password);

  const ifPswIsDigital = /\d/.test(password);

  const ifPswIsEight = password?.length >= 8;

  const ifPswIsSimbol = /[^A-Za-z0-9]/.test(password);

  const passwordsMatchCheck = password === reenteredPassword;



  async function handleSubmit(e) {
    e.preventDefault();

    const newData = {
      email: email, new_password: password
    }
    mutate(newData, { onSuccess: () => { navigate('/signin') } })

  }


  return (
    <div>
      <div className={styles.bg}></div>
      <div className={styles["login-container"]}>
        <div className={styles["left-side"]}>
          <div className={styles.logo}>
            <div className={styles.img}>
              <Link to={"/signin"}>
                <img src={guruIcon} alt="logo" />
              </Link>
            </div>
            <Link to={"/signin"}>
              <h2 className={styles["main-name"]}>
                G<span>el</span>G<span>uru</span>
              </h2>
            </Link>
          </div>
        </div>
        <div className={styles["right-side"]}>
          <div className={styles["input-group"]}>
            <div className={styles.progres}>
              <div className={page === 1 ? styles.line : styles.line}></div>
              <div className={page === 2 ? styles.line : styles.line2}></div>
            </div>
            <p className={styles["sign-in"]}>Enter Your Email</p>
            <form onSubmit={handleSubmit} className={styles["form-group"]}>

              {page === 1 &&
                <>
                  <input
                    className={styles["input email"]}
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className={styles["label email-label"]} htmlFor="email">
                    Email
                  </label>
                  <div className={styles['pass-check']}>
                    <div className={!firstPasswordClicked ? styles.hidden : ''}>
                      <div className={styles['circle']}>
                        {ifPswIsEight ? (
                          <img src={checkIcon} alt="" />
                        ) : (
                          <img src={circleIcon} alt="" />
                        )}
                        <p className={styles['check']}>At least 8 characters</p>
                      </div>
                      <div className={styles['circle']}>
                        {ifPswIsCapital ? (
                          <img src={checkIcon} alt="" />
                        ) : (
                          <img src={circleIcon} alt="" />
                        )}
                        <p className={styles['check']}>At least 1 capital letter </p>
                      </div>
                    </div>
                    <div className={!firstPasswordClicked ? styles.hidden : ''}>
                      <div className={styles['circle']}>
                        {ifPswIsDigital ? (
                          <img src={checkIcon} alt="" />
                        ) : (
                          <img src={circleIcon} alt="" />
                        )}
                        <p className={styles['check']}>At least 1 digit </p>
                      </div>
                      <div className={styles['circle']}>
                        {ifPswIsSimbol ? (
                          <img src={checkIcon} alt="" />
                        ) : (
                          <img src={circleIcon} alt="" />
                        )}
                        <p className={styles['check']}>At least 1 special character </p>
                      </div>
                    </div>
                  </div>
                </>
              }
              {page === 2 &&
                <div className="flex flex-col items-start justify-center gap-2">

                  <div className="w-full">
                    <input
                      className={`${styles.input} ${styles.password}`}
                      type={showPassword1 ? 'text' : 'password'}
                      id="password"
                      name="password"
                      onClick={handleFirstPasswordClick}
                      onChange={hanldePassword}
                      value={password}
                    />
                    <label className={styles['label']} htmlFor="password">
                      Enter Password
                    </label>

                    <div className={styles['pass-check']}>
                      <div className={!firstPasswordClicked ? styles.hidden : ''}>
                        <div className={styles['circle']}>
                          {ifPswIsEight ? (
                            <img src={checkIcon} alt="" />
                          ) : (
                            <img src={circleIcon} alt="" />
                          )}
                          <p className={styles['check']}>At least 8 characters</p>
                        </div>
                        <div className={styles['circle']}>
                          {ifPswIsCapital ? (
                            <img src={checkIcon} alt="" />
                          ) : (
                            <img src={circleIcon} alt="" />
                          )}
                          <p className={styles['check']}>At least 1 capital letter </p>
                        </div>
                      </div>
                      <div className={!firstPasswordClicked ? styles.hidden : ''}>
                        <div className={styles['circle']}>
                          {ifPswIsDigital ? (
                            <img src={checkIcon} alt="" />
                          ) : (
                            <img src={circleIcon} alt="" />
                          )}
                          <p className={styles['check']}>At least 1 digit </p>
                        </div>
                        <div className={styles['circle']}>
                          {ifPswIsSimbol ? (
                            <img src={checkIcon} alt="" />
                          ) : (
                            <img src={circleIcon} alt="" />
                          )}
                          <p className={styles['check']}>At least 1 special character </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles['form-group']}>
                    <input
                      className={`${styles.input} ${styles.password}`}
                      type={showPassword2 ? 'text' : 'password'}
                      id="reenteredPassword"
                      name="reenteredPassword"
                      onChange={handleReenteredPassword}
                      value={reenteredPassword}
                    />
                    <label
                      className={styles['label']}
                      htmlFor="reenteredPassword"
                    >
                      Re-enter Password
                    </label>

                    <div
                      className={
                        passwordsMatchCheck || !reenteredPassword
                          ? styles['hidden']
                          : styles['match']
                      }
                    >
                      <img src={errorIcon} alt="" />
                      <p>Does not match</p>
                    </div>
                  </div>
                </div>
              }
              <div className="flex justify-center items-center">
                {page === 1 && <Button size='lg' variant='shadow' color='success' type='button' onClick={() => setPage(page => page + 1)} className='text-white'>
                  <p className={styles.next}>Next</p>
                </Button>}
                {page === 2 && <Button size='lg' variant='shadow' color='success' type='submit' className='text-white'>
                  <p className={styles.next}>{isPending ? 'Loading' : 'Next'}</p>
                </Button>
                }
              </div>
            </form>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
