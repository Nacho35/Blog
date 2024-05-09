import "./globals.css";
import Theme from "./styles/theme";

export const metadata = {
  title: "Blog Codigo & Cafe",
  description: "Created by Ignacio Morales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Theme>
        <body className="tw-bg-alternative">{children}</body>
      </Theme>
    </html>
  );
}
