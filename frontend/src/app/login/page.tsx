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
  renders++;
  const onSubmit = async (data: FormValuesProps) => {
    const request = buildRequest({
      method: "POST",
      path: "auth/login",
      body: {
        grant_type: "password",
        nome: data.username,
        senha: data.password,
      },
    }).then(async (r: any) => {
      axiosInstance
        .request(r)
        .then(async (response: any) => {
          const status = response?.status;
          dispatch(setAuth({ token: "Bearer " + response?.data?.token }));
          router.push("/inicio");
        })
        .catch((error: any) => {
          console.log("error", error);
          const status = error?.response?.status;

          if (status == 404) {
            toast.error("Falha ao realizar login, verifique!");
            setError("root", {
              message: "",
              type: "custom",
            });
            console.error(
              "Credentials returns 401 because: Failed to request API, returns 404 not found"
            );
          } else if (status == 401 || status == 403) {
            toast.error("Usuário ou senha inválidos");
            setError("username", {
              message: "Usuário inválido",
              type: "custom",
            });
            setError("password", {
              message: "Senha inválida",
              type: "custom",
            });
          } else if (status == 400) {
            toast.error("Erro desconhecido, aguarde e tente novamente");
            setError("username", {
              message: "Erro desconhecido",
              type: "custom",
            });
            reset();
          } else {
            toast.error("Erro desconhecido ao realizar login!");
            console.error(
              "Credentials returns 401 because: Failed to request API, returns 5xx or 4xx Error"
            );
            setError("root", {
              message: "",
              type: "custom",
            });
          }
        });
    });
  };
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
        {renders}
        <Grid
          item
          xs={10}
          sm={9}
          md={7}
          lg={5}
          sx={{
            contentAlign: "center",
            justifyContent: "center",
            marginTop: "30vh",
            mx: "auto",
          }}
        >
          <Card sx={{ padding: 2 }}>
            <CardHeader title={"Login"} sx={{ p: 2 }} />
            <Stack spacing={3}>
              <MyTextField
                name="username"
                label={"Usuário"}
                autoComplete="username"
                focused={true}
                autoFocus={true}
                inputProps={{
                  style: {
                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
                  },
                }}
              />
              <MyTextField
                name="password"
                label={"Senha"}
                autoComplete="current-password"
                focused={true}
                autoFocus={true}
                type={showPassword ? "text" : "password"}
                inputProps={{
                  style: {
                    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Icon
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            ></Stack>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {"Login"}
            </LoadingButton>
          </Card>
        </Grid>
      </Grid>
    </MyFormProvider>
  );
}