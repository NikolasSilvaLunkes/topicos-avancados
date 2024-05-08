"use client";

import { useState } from "react";
import { Button, Grid, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { buildRequestAuth } from "@/resources/axios/requestBuilder";
import axiosInstance from "@/resources/axios/axiosInstance";
import { useSelector } from "@/redux/store";
import { getAuth, obterAutenticacao } from "@/resources/auth";
let renders = 1;

export default function LoginForm() {
  const router = useRouter();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const schema = z.object({
    username: z
      .string({
        invalid_type_error: "Usuário obrigatório",
        required_error: "Usuário obrigatório",
      })
      .min(1, { message: "Usuário obrigatório" }),
    password: z
      .string({
        invalid_type_error: "Senha obrigatória",
        required_error: "Senha obrigatória",
      })
      .min(1, { message: "Senha obrigatória" }),
  });
  const defaultValues = {
    username: "",
    password: "",
  };
  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  type FormValuesProps = {
    username: string;
    password: string;
  };
  obterAutenticacao();

  return (
    <Grid xs={12} container item>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            const request = buildRequestAuth({
              method: "GET",
              path: "usuario",
            }).then(async (r: any) => {
              console.log("arrrequest", r);
              axiosInstance.request(r);
            });
          }}
        >
          Test
        </Button>
        {getAuth().token}
      </Grid>
    </Grid>
  );
}
