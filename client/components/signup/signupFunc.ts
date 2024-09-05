import { SIGNUP } from "@/constants/mutations/auth";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@apollo/client";

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  register: {
    token: string;
  };
}

const SignupAction = () => {
  const { signIn } = useAuth();
  const [signup, { error, loading }] = useMutation<
    SignupResponse,
    SignupRequest
  >(SIGNUP, {
    onCompleted: (data) => {
      if (data.register.token) {
        signIn(data.register.token);
      } else {
        throw new Error("Invalid token");
      }
    },
  });

  return { signup, error, loading };
};

export default SignupAction;
