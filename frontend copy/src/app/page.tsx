import { Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
      >
        <Grid item>
          <Typography variant="h2">Bem vindo ao sistema</Typography>
        </Grid>
      </Grid>
    </main>
  );
}
