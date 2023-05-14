import {
  Card,
  Image,
  Text,
  Button,
  Stack,
  SimpleGrid,
  Title,
  Group,
} from "@mantine/core";

import { Center } from "@mantine/core";
import { APIRestaurantImage } from "../api/types";
import { IconPhotoOff } from "@tabler/icons-react";
import { uploads } from "../api/helpers";
import { Carousel } from "@mantine/carousel";

interface RestaurantImagesProps {
  images: APIRestaurantImage[];
  height?: number;
}

const RestaurantImages: React.FC<RestaurantImagesProps> = ({
  images,
  height = 160,
}) => {
  if (images.length == 0) {
    return (
      <Center style={{ height: 160 }}>
        <IconPhotoOff />
      </Center>
    );
  }

  return (
    <Carousel height={height} mx="auto" withIndicators>
      {images.map((image) => (
        <Carousel.Slide key={`slide-${image.id}`}>
          <Image src={uploads(image.path)} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default RestaurantImages;
