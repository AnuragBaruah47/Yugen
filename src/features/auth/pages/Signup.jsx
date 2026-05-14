import React from "react";
import { useForm } from "react-hook-form";
import authService from "../../../app/lib/Appwrite/authservice";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);

      await authService.createAccount(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", {
          required: "Name is required",
        })}
      />
      {errors.name && <p>{errors.name.message}</p>}
      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid Email Address" },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

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
  );
};

export default Signup;
