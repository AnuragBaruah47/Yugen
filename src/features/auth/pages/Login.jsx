import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {};
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid Email Address",
            },
          })}
        />
        {errors.email && <p>{error.email.message}</p>}

        <input
          type="password"
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
