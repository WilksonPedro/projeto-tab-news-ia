import { Suspense } from "react";
import Confetti from "./confetti";

export const dynamic = "force-dynamic";

async function getPublishedContents() {
  try {
    const response = await fetch(
      "https://www.tabnews.com.br/api/v1/contents?strategy=new&per_page=1&page=1",
      { cache: "no-store", signal: AbortSignal.timeout(8000) },
    );
    const total = response.headers.get("x-pagination-total-rows");
    if (!response.ok || !total || !/^\d+$/.test(total)) return null;
    const count = Number(total);
    return Number.isSafeInteger(count) ? count : null;
  } catch {
    return null;
  }
}

async function PublishedContents() {
  const total = await getPublishedContents();

  return total !== null ? (
    <>
      <p className="total">{total.toLocaleString("pt-BR")}</p>
      <p className="stats-label">conteúdos publicados no TabNews</p>
      <p className="stats-note">Consultado na API pública a cada acesso.</p>
    </>
  ) : (
    <p className="stats-unavailable">Não foi possível consultar o total de conteúdos agora. Você pode acompanhar as publicações no site oficial.</p>
  );
}

export default function Home() {
  return (
    <>
      <Confetti />
      <div className="page-shell">
        <header className="site-header">
          <span className="wordmark"><span aria-hidden="true">{">_"}</span> TabNews<span className="wordmark-detail"> / do zero</span></span>
          <span className="status"><span /> Em desenvolvimento</span>
        </header>
        <main>
          <div className="eyebrow"><span aria-hidden="true">01 /</span> O próximo capítulo começa aqui</div>
          <div className="construction-icon" aria-hidden="true">{"</>"}</div>
          <h1>Em construção<span>.</span></h1>
          <p className="intro">
            Estamos neste exato momento reconstruindo o TabNews, um lugar na
            internet para quem trabalha com tecnologia e precisa consumir
            conteúdos com valor concreto.
          </p>
          <section className="stats" aria-label="Publicações no TabNews oficial">
            <div className="stats-heading"><span className="signal" aria-hidden="true" /> Enquanto construímos por aqui</div>
            <div className="stats-content">
              <Suspense fallback={<p className="stats-unavailable" role="status">Consultando publicações…</p>}>
                <PublishedContents />
              </Suspense>
            </div>
          </section>
          <a className="official-link" href="https://www.tabnews.com.br/">
            Explorar o TabNews oficial <span aria-hidden="true">↗</span>
          </a>
        </main>
        <footer><span>Feito de código, curiosidade e comunidade.</span><span className="footer-code" aria-hidden="true">&lt; / &gt;</span></footer>
      </div>
    </>
  );
}
