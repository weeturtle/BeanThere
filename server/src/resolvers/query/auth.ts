import authenticate, { AuthContext } from "../../util/authenticate";

export const verifyQuery = async (_1: any, _2: any, context: unknown) => {
  const { user_id } = context as AuthContext;

  if (user_id) {
    return true;
  }
  return false;
};
