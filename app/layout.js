import './globals.css';

export const metadata = {
  title: 'Drag and Drop App',
  description: 'A simple drag-and-drop app using Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
