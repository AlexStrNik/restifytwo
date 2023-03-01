import { createEvent, createStore, merge, sample, split } from "effector";
import { useStore } from "effector-react";
import {
  Anchor,
  createStyles,
  Paper,
  PasswordInput as PasswordInput_,
  TextInput as TextInput_,
  Title,
  Text,
  Button,
} from "@mantine/core";

import { APIUserRegister, APIUserSign } from "../api/types";
import { createFormStore } from "../models/form";
import { signIn, signInFx, signUp, signUpFx } from "../models/session";

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

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: "100vh",
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const TextInput = form.controlled(TextInput_);
const PasswordInput = form.controlled(PasswordInput_);

const AuthPage = () => {
  const { classes } = useStyles();
  const isSignUp = useStore($isSignUp);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={1}>Welcome back!</Title>

        {isSignUp && (
          <TextInput
            name="name"
            label="Name"
            placeholder="John Smith"
            size="md"
            mb="md"
          />
        )}
        <TextInput
          name="email"
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Button onClick={() => sumbit()} fullWidth mt="xl" size="md">
          {isSignUp ? "Register" : "Login"}
        </Button>

        <Text align="center" mt="md">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Anchor<"a">
            href="#"
            weight={700}
            onClick={(event) => {
              event.preventDefault();
              toggleSignUp();
            }}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};

export default AuthPage;
