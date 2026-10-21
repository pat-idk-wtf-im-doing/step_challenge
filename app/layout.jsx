import './globals.css';

export const metadata = {
  title: 'FML STEPS — Team Step Challenge',
  description: 'Track daily steps and team points for the Fall Into Fitness challenge.',
  appleWebApp: {
    capable: true,
    title: 'FML STEPS',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport = {
  themeColor: '#0b1020',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a href="/" className="brand">🍂 Fall Into Fitness</a>
          <nav>
            <a href="/">Leaderboard</a>
            <a href="/matrix">Matrix</a>
            <a href="/entry">Enter Steps</a>
            <a href="/rules">Rules</a>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
