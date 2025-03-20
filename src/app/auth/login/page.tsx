"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useAuth } from "../../../hooks/useAuth";
import { LoginRequest } from "../../../types/auth";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    setError("");

    try {
      await login(data);
      router.push("/bible"); // Redireciona para a página da bíblia após o login
    } catch (err: any) {
      console.error("Erro ao fazer login:", err);
      setError(
        err.response?.data?.message ||
          "Falha ao realizar login. Verifique suas credenciais."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Entrar
      </h1>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Seu email"
          {...register("email", { required: "Email é obrigatório" })}
          error={errors.email?.message}
        />

        <Button type="submit" fullWidth isLoading={isLoading}>
          Entrar
        </Button>
      </form>

      <div className="mt-4 text-center text-sm text-grayDetail">
        Ainda não tem uma conta?{" "}
        <Link
          href="/auth/register"
          className="text-primary hover:underline hover:underline-offset-2"
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}
