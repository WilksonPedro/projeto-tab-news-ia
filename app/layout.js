import "./globals.css";

export const metadata = {
  title: "Em construção | TabNews do zero",
  description: "Estamos reconstruindo o TabNews: um lugar para quem trabalha com tecnologia e busca conteúdos com valor concreto.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
