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

let renders = 1;
export default function LoginForm() {
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
            onClick={() => router.push(`/caixa/lancamento/${params.row.id}`)}
          >
            <EditNoteIcon />
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => dispatch(deleteLancamento(params.row.id))}
          >
            <RemoveCircleIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: "historico",
      headerName: "Historico",
      width: 250,
      flex: 1,
    },
    {
      field: "valor",
      headerName: "Valor",
      width: 150,
      flex: 1,
    },
    {
      field: "valorTotal",

      headerName: "total",
      width: 150,
      flex: 1,
    },
    {
      field: "data",
      headerName: "Data",
      width: 150,
      flex: 1,
    },
    {
      field: "vencimento",
      headerName: "Vencimento",
      width: 150,
      flex: 1,
    },
    {
      field: "baixa",
      headerName: "Baixa",
      width: 150,
      flex: 1,
    },
    {
      field: "dc",
      headerName: "D/C",
      width: 150,
      flex: 1,
    },
    {
      field: "juros",
      headerName: "Juros",
      width: 150,
      flex: 1,
    },
    {
      field: "multa",
      headerName: "Multa",
      width: 150,
      flex: 1,
    },
    {
      field: "acrescimos",
      headerName: "Acrescimos",
      width: 150,
      flex: 1,
    },
    {
      field: "descontos",
      headerName: "Descontos",
      width: 150,
      flex: 1,
    },
  ];

  useEffect(() => {
    dispatch(getLancamentos());
  }, []);

  const rows =
    useSelector((state) =>
      state.caixa.lancamentos?.map((a: any) => {
        return { ...a, valorTotal: a.valorTotal.toFixed(2) };
      })
    ) || [];

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
                      router.push("/caixa/lancamento");
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
