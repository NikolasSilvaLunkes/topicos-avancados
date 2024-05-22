"use client";

import {
  Button,
  Card,
  CardContent,
  Grid,
  Hidden,
  IconButton,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { dispatch, useSelector } from "@/redux/store";
import { getAuth, obterAutenticacao } from "@/resources/auth";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import {
  Lancamento,
  deleteLancamento,
  downloadPdf,
  getLancamentos,
  saveCaixa,
  saveLancamento,
} from "@/redux/slices/modules/caixa";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { ptBR } from "@mui/x-data-grid/locales";
import { toast } from "react-toastify";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

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
      filterable: false,
      width: 140,
      renderCell: (params: any) => (
        <>
          <IconButton
            color="primary"
            aria-label="editar"
            onClick={() => router.push(`/caixa/lancamento/${params.row.id}`)}
          >
            <EditNoteIcon />
          </IconButton>

          <IconButton
            color="primary"
            aria-label="deletar"
            onClick={() => dispatch(deleteLancamento(params.row.id))}
          >
            <RemoveCircleIcon />
          </IconButton>

          <IconButton
            color="primary"
            aria-label="quitar"
            onClick={() =>
              dispatch(
                saveLancamento({
                  ...params.row,
                  baixa: new Date().toISOString().split("T")[0],
                })
              )
                .then(async () => {
                  toast.success("Lançamento quitado com sucesso");
                  dispatch(getLancamentos());
                })
                .catch(() => {
                  toast.error("Erro ao quitado lançamento");
                })
            }
          >
            <CurrencyExchangeIcon />
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
      field: "debitoCredito",
      headerName: "Débito/Crédito",
      width: 150,
      flex: 1,
    },
    {
      field: "juros",
      headerName: "Juros",
      width: 150,
      flex: 1,
      hide: true,
    },
    {
      field: "multa",
      headerName: "Multa",
      width: 150,
      flex: 1,
      hide: true,
    },
    {
      field: "acrescimos",
      headerName: "Acrescimos",
      width: 150,
      flex: 1,
      hide: true,
    },
    {
      field: "descontos",
      headerName: "Descontos",
      width: 150,
      flex: 1,
      hide: true,
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
              <DataGridPremium
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                headerFilters
                rows={rows}
                columns={columns}
                filterMode="client"
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                  columns: {
                    columnVisibilityModel: {
                      juros: false,
                      acrescimos: false,
                      descontos: false,
                      multa: false,
                    },
                  },
                }}
                pageSizeOptions={[5]}
              />
              <Grid
                item
                xs={12}
                columnSpacing={1}
                container
                justifyContent="flex-end"
              >
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      dispatch(downloadPdf());
                    }}
                  >
                    PDF
                  </Button>
                </Grid>
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
