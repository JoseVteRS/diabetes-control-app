import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <h1>Login Page</h1>

      <form>
        <input
          type="text"
          placeholder="Correo electronico"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
