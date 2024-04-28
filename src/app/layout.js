import Theme from "./styles/theme";
import "./globals.css";

export const metadata = {
  title: "Blog Codigo & Cafe",
  description: "Created by Ignacio Morales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Theme>
        <body className="tw-bg-shaft">{children}</body>
      </Theme>
    </html>
  );
}
