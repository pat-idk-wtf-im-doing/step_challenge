export default function manifest() {
  return {
    name: 'FML STEPS — Team Step Challenge',
    short_name: 'FML STEPS',
    description: 'Track daily steps and team points for the Fall Into Fitness challenge.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0b1020',
    theme_color: '#0b1020',
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
