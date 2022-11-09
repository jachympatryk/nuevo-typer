import { getUserPoints } from "firestore";
import { PointsModel } from "models";
import { RankUser } from "pages/rank/rank.types";

export const getPoints = async (user: RankUser): Promise<RankUser> => {
  try {
    const userPoints = await getUserPoints(user.id);

    const pointsResponse =
      (userPoints?.docs?.map((doc) => {
        return { id: doc.id, ...doc?.data?.() };
      }) as unknown as PointsModel[]) || null;

    const points = pointsResponse?.reduce((acc, value) => acc + value.points, 0);
    return { ...user, points };
  } catch (e) {
    return { ...user, points: 0 };
  }
};
