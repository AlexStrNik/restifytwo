import { ComponentType, useEffect } from "react";
import { useStore } from "effector-react";
import { AppShell, MantineProvider, ScrollArea } from "@mantine/core";
import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";
import { RouterProvider } from "atomic-router-react";

import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import { Pages, pagesMap } from "./pages";
import { pageMounted } from "./models/page";
import { $theme } from "./models/theme";
import { $session } from "./models/session";

const $loggedIn = $session.map((session) => session !== null);

const router = createHistoryRouter({ routes: pagesMap });
router.setHistory(createBrowserHistory());

const App = () => {
  useEffect(() => {
    pageMounted();
  }, []);

  const loggedIn = useStore($loggedIn);

  if (!loggedIn) {
    return <AuthPage />;
  }

  return (
    <AppShell
      asideOffsetBreakpoint="sm"
      navbar={<Navbar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      })}
      padding={0}
    >
      <div style={{ overflowY: "scroll", overflowX: "hidden" }}>
        <Pages />
      </div>
    </AppShell>
  );
};

const withProviders = <P extends {}>(App: ComponentType<P>) => {
  return (props: P) => {
    const theme = useStore($theme);

    return (
      <RouterProvider router={router}>
        <MantineProvider
          theme={{
            colorScheme: theme.colorScheme,
            primaryColor: theme.primaryColor,
            primaryShade: theme.colorScheme === "dark" ? 7 : 5,
            loader: "dots",
            fontFamily: "Mulish",
          }}
        >
          <App {...props} />
        </MantineProvider>
      </RouterProvider>
    );
  };
};

export default withProviders(App);
