import { Rating, useMantineTheme } from "@mantine/core";

import { APIReviewLight } from "../api/types";

interface RestaurantRatingProps {
  reviews: APIReviewLight[];
}

const RestaurantRating: React.FC<RestaurantRatingProps> = ({ reviews }) => {
  const theme = useMantineTheme();

  let rating = 0.0;
  if (reviews.length > 0) {
    rating = reviews.reduce((sum, review) => sum + review.rating, 0);
    rating /= reviews.length;
  }

  return (
    <Rating
      color={theme.primaryColor}
      defaultValue={rating}
      readOnly
      fractions={2}
    />
  );
};

export default RestaurantRating;
