import { useEffect } from "react";
import { useEvent, useStore } from "effector-react";

import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";

import { pageMounted } from "./models/page";
import { $session } from "./models/session";

const $loggedIn = $session.map((session) => session !== null);

function App() {
  const handlePageMount = useEvent(pageMounted);
  useEffect(() => {
    handlePageMount();
  }, [handlePageMount]);

  const loggedIn = useStore($loggedIn);

  return loggedIn ? <Dashboard /> : <Auth />;
}

export default App;
