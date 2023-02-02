import { createEvent, createStore, merge, sample, split } from "effector";
import { useStore } from "effector-react";

import { APIUserRegister, APIUserSign } from "../../api/types";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Pane } from "../../components/Pane";
import { TextButton } from "../../components/TextButton";

import { createFormStore } from "../../models/form";
import { signIn, signInFx, signUp, signUpFx } from "../../models/session";

import "./index.css";

const sumbit = createEvent();
const toggleSignUp = createEvent();

const form = createFormStore<APIUserRegister | APIUserSign>();
const $isSignUp = createStore(false).on(toggleSignUp, (s) => !s);

sample({
  clock: merge([signInFx.done, signUpFx.done]),
  target: form.clear,
});

split({
  clock: sumbit,
  source: form.$store,
  match: {
    signUp: $isSignUp,
  },
  cases: {
    signUp,
    __: signIn,
  },
});

export const Auth = () => {
  const isSignUp = useStore($isSignUp);

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
        <Button onClick={sumbit}>{isSignUp ? "Sign up" : "Sign in"}</Button>
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
