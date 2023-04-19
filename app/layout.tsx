import "../styles/globals.css";

export const metadata = {
  title: "Howdy NextJS",
  description: "Fullstack web app with magic framework!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
