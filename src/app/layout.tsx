import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Yash Gupta',
    default:
      'Yash Gupta - Software Developer, UI insect, and part time cosmos enjoyer',
  },

  icons: {
    icon: '/favicon.ico',
  },
  description:
    'Im Yash Gupta Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam quis culpa laboriosam quisquam aperiam, vero dignissimos fuga incidunt. Blanditiis consectetur ratione tenetur sed non molestiae optio, quidem incidunt nam repellendus?.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
