"use client";

import { useState } from "react";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { buildRequestAuth } from "@/resources/axios/requestBuilder";
import axiosInstance from "@/resources/axios/axiosInstance";
import { useSelector } from "@/redux/store";
import { getAuth, obterAutenticacao } from "@/resources/auth";
let renders = 1;

export default function dashboard() {
  const router = useRouter();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const schema = z.object({});
  const defaultValues = {};
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
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item>
        <Typography variant="h4">Bem vindo ao sistema!</Typography>
      </Grid>
    </Grid>
  );
}
