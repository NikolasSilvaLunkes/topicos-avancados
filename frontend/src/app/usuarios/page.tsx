"use client";

import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { dispatch, useSelector } from "@/redux/store";
import { getAuth, obterAutenticacao } from "@/resources/auth";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { deleteLancamento, getLancamentos } from "@/redux/slices/modules/caixa";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  deleteUsuario,
  getUsuarios,
  setShowPassword,
  Usuario,
} from "@/redux/slices/modules/usuario";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

let renders = 1;
export default function UsuarioGrid() {
  const router = useRouter();
  const theme = useTheme();

  obterAutenticacao();

  const columns = [
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      width: 120,
      renderCell: (params: any) => (
        <>
          <IconButton
            color="primary"
            onClick={() => router.push(`/usuarios/editar/${params.row.id}`)}
          >
            <EditNoteIcon />
          </IconButton>
          {params?.row?.nome !== "admin" && (
            <IconButton
              color="primary"
              onClick={() => dispatch(deleteUsuario(params.row.id))}
            >
              <RemoveCircleIcon />
            </IconButton>
          )}
        </>
      ),
    },
    { field: "nome", headerName: "Nome", width: 350 },
    {
      field: "senha",
      headerName: "Senha",
      width: 350,
      renderCell: (params: any) => {
        const showPassword = params.row.showPassword || false;
        const index = rows.findIndex((v: Usuario) => v.id === params.id);
        return (
          <>
            <IconButton
              onClick={() => dispatch(setShowPassword([!showPassword, index]))}
              edge="start"
              color="primary"
            >
              {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </IconButton>
            {showPassword ? params.value : "*".repeat(8)}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getUsuarios());
  }, []);

  const rows = useSelector((state) => state.usuario.usuarios) || [];

  obterAutenticacao();
  const auth = getAuth();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={11} md={10}>
        <Card>
          <CardContent>
            <Grid
              container
              item
              xs={12}
              spacing={2}
              p={2}
              justifyContent="center"
              alignItems="center"
            >
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                }}
                pageSizeOptions={[5]}
              />
              <Grid item xs={12} container justifyContent="flex-end">
                <Grid item xs={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      router.push("/usuarios/adicionar");
                    }}
                  >
                    Adicionar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
