import { createEvent, sample, Store } from "effector";
import { useCallback, useState } from "react";

import { APIUserRegister, APIUserSign } from "../../api/types";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Pane } from "../../components/Pane";
import { TextButton } from "../../components/TextButton";

import { createFormStore } from "../../models/form";
import { signIn, signUp } from "../../models/session";

import "./index.css";

const form = createFormStore<APIUserRegister | APIUserSign>();
const sumbit = createEvent<boolean>();

sample({
  clock: sumbit,
  source: form.$store as Store<APIUserRegister>,
  filter: (_, isSignUp) => isSignUp,
  target: signUp,
});

sample({
  clock: sumbit,
  source: form.$store as Store<APIUserSign>,
  filter: (_, isSignUp) => !isSignUp,
  target: signIn,
});

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const toggleSignUp = useCallback(() => {
    setIsSignUp((prev) => !prev);
  }, []);

  return (
    <div className="AuthPage">
      <div className="AuthPage-Pane">
        <div className="AuthPage-Header">
          <h1 className="AuthPage-Title">Welcome back!</h1>
          <p className="AuthPage-Description">Please enter your details.</p>
        </div>
        {isSignUp && (
          <Input
            form={form}
            name="name"
            placeholder="Enter your name"
            label="Name"
          ></Input>
        )}
        <Input
          form={form}
          name="email"
          type="email"
          placeholder="Enter your email"
          label="Email"
        ></Input>
        <Input
          form={form}
          name="password"
          type="password"
          placeholder="Password"
          label="Password"
        ></Input>
        <Button onClick={() => sumbit(isSignUp)}>
          {isSignUp ? "Sign up" : "Sign in"}
        </Button>
        <p className="AuthPage-SignToggle">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <TextButton onClick={toggleSignUp}>
            {isSignUp ? "Sign in" : "Sign up"}
          </TextButton>
        </p>
      </div>
      <Pane className="AuthPage-Decoration" />
    </div>
  );
};
