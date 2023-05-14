import {
  Text,
  Image,
  SimpleGrid,
  Group,
  rem,
  useMantineTheme,
  Input,
  ActionIcon,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { upperFirst } from "@mantine/hooks";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react";

type Images = FileWithPath[];

interface ImageInputProps {
  value: Images;
  label: string;
  onChange(value: Images): void;
}

const ImageInput: React.FC<ImageInputProps> = ({
  value,
  label,
  onChange,
  ...others
}) => {
  const theme = useMantineTheme();

  const previews = value.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <Group
        key={`preview-${file.name}`}
        style={{
          position: "relative",
        }}
      >
        <Image
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
        <ActionIcon
          variant="filled"
          color={theme.primaryColor}
          style={{ position: "absolute", right: rem(5), top: rem(5) }}
          title="Delete image"
          size="xs"
          onClick={() => onChange(value.filter((_, i) => index !== i))}
        >
          <IconX />
        </ActionIcon>
      </Group>
    );
  });

  return (
    <Input.Wrapper labelElement="div" label={upperFirst(label)} {...others}>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={(newImages) => onChange([...value, ...newImages])}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(220), pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>

      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid>
    </Input.Wrapper>
  );
};

export default ImageInput;
