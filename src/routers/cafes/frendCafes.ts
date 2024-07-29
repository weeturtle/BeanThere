import prisma from "../../database";

// Find all friends that have starred a passed cafe
//
export const findFriendStarredCafes = async (
  user_id: string,
  cafe_id: string,
) => {
  const friends = await prisma.friends.findMany({
    where: {
      user_id,
      Friend_User: {
        Starred_Cafes: {
          some: {
            cafe_id,
          },
        },
      },
    },
    select: {
      Friend_User: true,
    },
  });

  return friends;
};

export const findAllCommonCafe = async (user_id: string) => {
  const userStarredCafes = await prisma.starred_Cafes.findMany({
    where: {
      user_id,
    },
    select: {
      cafe_id: true,
    },
  });

  const cafes = await prisma.friends.findMany({
    where: {
      user_id,
      Friend_User: {
        Starred_Cafes: {
          some: {
            cafe_id: {
              in: userStarredCafes.map((cafe) => cafe.cafe_id),
            },
          },
        },
      },
    },
    select: {
      Friend_User: {
        select: {
          id: true,
          Starred_Cafes: {
            select: {
              cafe_id: true,
            },
          },
        },
      },
    },
  });

  interface CafesFormat {
    [cafe_id: string]: string[];
  }
  const formattedCafes: CafesFormat = {};

  for (let {
    Friend_User: { id, Starred_Cafes },
  } of cafes) {
    for (let { cafe_id } of Starred_Cafes) {
      if (cafe_id in formattedCafes) {
        formattedCafes[cafe_id].push(id);
      } else {
        formattedCafes[cafe_id] = [id];
      }
    }
  }

  return formattedCafes;
};

export const findCommonCafeFriend = async (
  user_id: string,
  friend_ids: string[],
) => {
  const all_ids = [user_id, ...friend_ids];
  // TODO: Double check this returns desired values
  const starred_cafes = await prisma.cafes.findMany({
    where: {
      Starred_Cafes: {
        every: {
          User: {
            id: {
              in: all_ids,
            },
          },
        },
      },
    },
    select: {
      id: true,
    },
  });

  // Will this find cafes mutually starred by all passed users? answer below please
  //

  return starred_cafes;
};
