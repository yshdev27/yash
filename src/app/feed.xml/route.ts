import assert from 'assert'
import { Feed } from 'feed'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export async function GET(req: Request) {
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable')
  }

  let author = {
    name: 'Yash Gupta',
    email: 'gyash21@gmail.com',
  }

  let feed = new Feed({
    title: author.name,
    description: 'Your blog description',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  })

  let articlesDir = path.join(process.cwd(), 'src/app/articles')
  let articleIds = fs
    .readdirSync(articlesDir, { withFileTypes: true })
    .filter(
      (dirent) =>
        dirent.isDirectory() &&
        fs.existsSync(path.join(articlesDir, dirent.name, 'page.mdx'))
    )
    .map((dirent) => dirent.name)

  for (let id of articleIds) {
    const filePath = path.join(articlesDir, id, 'page.mdx')
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    // Fallbacks if frontmatter is missing
    const title = data.title || id
    const date = data.date || new Date().toISOString()
    const description = data.description || ''

    let publicUrl = `${siteUrl}/articles/${id}`

    feed.addItem({
      title,
      id: publicUrl,
      link: publicUrl,
      content,
      author: [author],
      contributor: [author],
      date: new Date(date),
      description,
    })
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
      'cache-control': 's-maxage=31556952',
    },
  })
}
