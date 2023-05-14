import { createEffect, attach, restore, sample } from "effector";

import { APIReviewCreate } from "../api/types";
import { $session } from "./session";
import { postReview, reviews } from "../api/reviews";

export const loadReviewsForRestuarantFx = createEffect((restaurant: number) =>
  reviews(restaurant)
);

const _createReview = createEffect(
  (params: { restaurantId: number; session: string; data: APIReviewCreate }) =>
    postReview(params.session, params.restaurantId, params.data).then(() =>
      Promise.resolve(params.restaurantId)
    )
);
export const createReviewFx = attach({
  source: $session,
  effect: _createReview,
  mapParams: (
    data: { restaurantId: number; data: APIReviewCreate },
    session
  ) => ({
    ...data,
    session: session as string,
  }),
});

export const $reviewsForRestaurant = restore(loadReviewsForRestuarantFx, []);

sample({
  clock: createReviewFx.doneData,
  target: loadReviewsForRestuarantFx,
});
