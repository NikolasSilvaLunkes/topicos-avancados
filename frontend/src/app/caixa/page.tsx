"use client";

import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  useTheme,
} from "@mui/material";
import MyFormProvider from "@/components/MyFormProvider";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setBearerToken } from "@/resources/axios/axios";
import MyTextField from "@/components/Inputs/MyTextInput";
import { buildRequest } from "@/resources/axios/requestBuilder";
import axiosInstance from "@/resources/axios/axiosInstance";
import { setAuth } from "@/redux/slices/auth";
import { dispatch } from "@/redux/store";
let renders = 1;
export default function LoginForm() {
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
  renders++;
  const onSubmit = async (data: FormValuesProps) => {};
  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        sx={{ display: "inline", float: "left" }}
      >
        <Grid item xs={4} p={4}>
          <MyTextField name="historico" label="historico" required />
        </Grid>
      </Grid>
    </MyFormProvider>
  );
}
