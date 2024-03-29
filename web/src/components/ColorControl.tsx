import {
  useMantineTheme,
  ColorSwatch,
  CheckIcon,
  Input,
  Group,
  DefaultMantineColor,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";

interface ColorControlProps {
  value: DefaultMantineColor;
  label: string;
  onChange(value: string): void;
}

const ColorControl: React.FC<ColorControlProps> = ({
  value,
  label,
  onChange,
  ...others
}) => {
  const theme = useMantineTheme();

  const colors = Object.keys(theme.colors)
    .slice(2)
    .map((color) => (
      <ColorSwatch
        color={
          theme.colorScheme === "dark"
            ? theme.colors[color][7]
            : theme.colors[color][5]
        }
        component="button"
        key={color}
        onClick={() => onChange(color)}
        radius="sm"
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color:
            theme.colorScheme === "dark" ? theme.colors[color][2] : theme.white,
          flex: "1 0 calc(15% - 4px)",
        }}
      >
        {value === color && <CheckIcon width={12} height={12} />}
      </ColorSwatch>
    ));

  return (
    <Input.Wrapper labelElement="div" label={upperFirst(label)} {...others}>
      <Group spacing={2} mt={5}>
        {colors}
      </Group>
    </Input.Wrapper>
  );
};

export default ColorControl;
