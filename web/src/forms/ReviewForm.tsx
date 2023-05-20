import {
  Stack,
  Textarea,
  Button,
  Rating,
  useMantineTheme,
  Flex,
  LoadingOverlay,
} from "@mantine/core";
import { createForm, useForm } from "effector-forms";
import { APIRestaurant } from "../api/types";
import { createEvent, sample } from "effector";
import { createReviewFx } from "../models/reviews";
import { useStore } from "effector-react";

const reviewForm = createForm({
  fields: {
    review: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (value: string) => Boolean(value) && value.length > 10,
        },
      ],
    },
    rating: {
      init: 0,
      rules: [
        {
          name: "required",
          validator: (value: number) => Boolean(value) && value > 0,
        },
      ],
    },
  },
  validateOn: ["change"],
});

const reviewSubmit = createEvent<number>();
sample({
  clock: reviewSubmit,
  source: reviewForm.$values,
  fn: (data, restaurantId) => ({
    restaurantId,
    data,
  }),
  target: createReviewFx,
});

sample({
  clock: createReviewFx.doneData,
  target: reviewForm.reset,
});

interface FeedbackFormProps {
  restaurant: APIRestaurant;
}

const ReviewForm: React.FC<FeedbackFormProps> = ({ restaurant }) => {
  const theme = useMantineTheme();
  const loading = useStore(createReviewFx.pending);
  const { fields, eachValid } = useForm(reviewForm);

  return (
    <Stack mt="md" style={{ position: "relative" }}>
      <LoadingOverlay visible={loading} />
      <Textarea
        autosize
        name="review"
        minRows={4}
        placeholder="Restaurant review"
        label="Review"
        value={fields.review.value}
        onChange={(e) => fields.review.onChange(e.target.value)}
      />
      <Flex justify="space-between">
        <Rating
          size="lg"
          color={theme.primaryColor}
          value={fields.rating.value}
          onChange={fields.rating.onChange}
          fractions={2}
        />
        <Button
          onClick={() => reviewSubmit(restaurant.id)}
          disabled={!eachValid}
        >
          Leave review
        </Button>
      </Flex>
    </Stack>
  );
};

export default ReviewForm;
