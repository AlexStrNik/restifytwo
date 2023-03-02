import { Stack, TextInput as TextInput_, Title } from "@mantine/core";
import { useStore } from "effector-react";

import { $theme, setPrimaryColor } from "../models/theme";
import { routes } from "../shared/routes";
import ColorControl from "../components/ColorControl";

const PreferencesPage = () => {
  const theme = useStore($theme);

  return (
    <>
      <Stack p="xl" maw={700} pos="relative">
        <Title order={1}>Preferences</Title>
        <ColorControl
          label="Primary color"
          value={theme.primaryColor}
          onChange={setPrimaryColor}
        />
      </Stack>
    </>
  );
};

export const route = routes.preferences;

export default {
  route,
  view: PreferencesPage,
};
