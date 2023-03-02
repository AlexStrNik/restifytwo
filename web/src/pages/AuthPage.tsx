import { createEvent, createStore, merge, sample, split } from "effector";
import { useStore } from "effector-react";
import {
  Anchor,
  createStyles,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
  Button,
} from "@mantine/core";
import { createForm, useForm } from "effector-forms";

import { signIn, signInFx, signUp, signUpFx } from "../models/session";

const sumbit = createEvent();
const toggleRegister = createEvent();

const authForm = createForm({
  fields: {
    register: {
      init: false,
      rules: [],
    },
    name: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (value: string, { register }) =>
            Boolean(value) || !register,
        },
      ],
    },
    email: {
      init: "",
      rules: [
        {
          name: "email",
          validator: (value: string) => /\S+@\S+\.\S+/.test(value),
        },
      ],
    },
    password: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (value: string) => Boolean(value),
        },
      ],
    },
  },
  validateOn: ["change"],
});

sample({
  clock: merge([signInFx.done, signUpFx.done]),
  target: authForm.reset,
});

sample({
  clock: toggleRegister,
  target: authForm.setForm,
  source: authForm.$values.map((values) => values.register),
  fn: (register) => ({ register: !register }),
});

split({
  clock: sumbit,
  source: authForm.$values,
  match: {
    signUp: authForm.$values.map((values) => values.register),
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

const AuthPage = () => {
  const { classes } = useStyles();

  const { fields, eachValid, values } = useForm(authForm);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title mb={50} order={1}>
          Welcome back!
        </Title>

        {values.register && (
          <TextInput
            label="Name"
            placeholder="John Smith"
            size="md"
            mb="md"
            value={fields.name.value}
            onChange={(e) => fields.name.onChange(e.target.value)}
            error={fields.name.errorText({
              required: "field required",
            })}
          />
        )}
        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          value={fields.email.value}
          onChange={(e) => fields.email.onChange(e.target.value)}
          error={fields.email.errorText({
            email: "you must enter a valid email address",
          })}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          value={fields.password.value}
          onChange={(e) => fields.password.onChange(e.target.value)}
          error={fields.password.errorText({
            required: "password required",
          })}
        />
        <Button
          disabled={!eachValid}
          onClick={() => sumbit()}
          fullWidth
          mt="xl"
          size="md"
        >
          {values.register ? "Register" : "Login"}
        </Button>

        <Text align="center" mt="md">
          {values.register
            ? "Already have an account? "
            : "Don't have an account? "}
          <Anchor<"a">
            href="#"
            weight={700}
            onClick={(event) => {
              event.preventDefault();
              toggleRegister();
            }}
          >
            {values.register ? "Sign in" : "Sign up"}
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};

export default AuthPage;
