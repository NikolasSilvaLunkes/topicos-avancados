"use client";

import CaixaForm from "@/app/caixa/form";
let renders = 1;
export default function Page({ params }: { params: { id: number } }) {
  return <CaixaForm params={params} />;
}
