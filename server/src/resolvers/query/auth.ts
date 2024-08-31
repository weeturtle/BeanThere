import authenticate from "../../util/authenticate";

export const verifyQuery = async (_1: any, _2: any, context: unknown) => {
  const auth_response = await authenticate(context);
  if (!auth_response) return false;
  return true;
};
