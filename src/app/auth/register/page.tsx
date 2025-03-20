"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useAuth } from "../../../hooks/useAuth";
import { RegisterRequest } from "../../../types/auth";

export default function Register() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const onSubmit = async (data: RegisterRequest) => {
    setIsLoading(true);
    setError("");

    try {
      await registerUser(data);
      router.push("/bible"); // Redireciona para a pu00e1gina da bu00edblia apu00f3s o registro
    } catch (err: unknown) {
      console.error("Erro ao registrar:", err);
      if (err && typeof err === "object" && "response" in err) {
        const errorResponse = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          errorResponse.response?.data?.message ||
            "Falha ao realizar o cadastro. Tente novamente."
        );
      } else {
        setError("Falha ao realizar o cadastro. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Criar Conta
      </h1>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nome"
          type="text"
          placeholder="Seu nome completo"
          {...register("name", { required: "Nome u00e9 obrigatu00f3rio" })}
          error={errors.name?.message}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Seu email"
          {...register("email", {
            required: "Email u00e9 obrigatu00f3rio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email invu00e1lido",
            },
          })}
          error={errors.email?.message}
        />

        <Button type="submit" fullWidth isLoading={isLoading}>
          Cadastrar
        </Button>
      </form>

      <div className="mt-4 text-center text-sm text-grayDetail">
        Já tem uma conta?{" "}
        <Link
          href="/auth/login"
          className="text-primary hover:underline hover:underline-offset-2"
        >
          Fazer login
        </Link>
      </div>
    </div>
  );
}
