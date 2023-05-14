import { useEffect } from "react";
import { useList, useStore } from "effector-react";
import {
  LoadingOverlay,
  Rating,
  Text,
  Stack,
  useMantineTheme,
  Group,
  Paper,
  Title,
  createStyles,
} from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

import { APIRestaurant, APIReview } from "../api/types";
import {
  $reviewsForRestaurant,
  loadReviewsForRestuarantFx,
} from "../models/reviews";

interface RestaurantReviewsProps {
  restaurant: APIRestaurant;
}

const useStyles = createStyles((theme) => {
  return {
    textWithIcon: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  };
});

const RestaurantReviews: React.FC<RestaurantReviewsProps> = ({
  restaurant,
}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  useEffect(() => {
    loadReviewsForRestuarantFx(restaurant.id);
  }, []);

  const loading = useStore(loadReviewsForRestuarantFx.pending);

  const reviews = useList($reviewsForRestaurant, {
    fn: (review: APIReview) => (
      <Paper key={review.id} shadow="sm" radius="md" p="md" withBorder>
        <Group position="apart" mb="xs">
          <Title className={classes.textWithIcon} order={3}>
            <IconUser /> {review.author.name}
          </Title>
          <Rating
            color={theme.primaryColor}
            defaultValue={review.rating}
            readOnly
            fractions={2}
          />
        </Group>
        <Text>{review.review}</Text>
      </Paper>
    ),
    placeholder: (
      <Stack style={{ minHeight: loading ? 160 : 0, position: "relative" }}>
        <LoadingOverlay visible={loading} />
      </Stack>
    ),
  });

  return reviews;
};

export default RestaurantReviews;
