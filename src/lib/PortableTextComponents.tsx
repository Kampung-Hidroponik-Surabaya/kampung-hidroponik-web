import React from 'react'
import Image from 'next/image'
import type {PortableTextComponents} from '@portabletext/react'
import {urlFor} from './sanity'

// ── Video URL → embed URL converter ───────────────────────────────────────
function resolveVideoEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace('www.', '')

    // YouTube: watch?v=ID or youtu.be/ID
    if (host === 'youtube.com') {
      const id = parsed.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1)
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    // Vimeo: vimeo.com/ID
    if (host === 'vimeo.com') {
      const id = parsed.pathname.slice(1)
      if (id) return `https://player.vimeo.com/video/${id}`
    }
    // Instagram + TikTok: no cross-origin iframe → fallback to link
    return null
  } catch {
    return null
  }
}

// ── Shared Portable Text component map ────────────────────────────────────
// Used by all post body renderers in Next.js
export const portableTextComponents: PortableTextComponents = {
  types: {
    // Inline image block
    image: ({value}) => {
      if (!value?.asset) return null
      return (
        <figure className="my-6">
          <div className="relative w-full overflow-hidden rounded-xl">
            <Image
              src={urlFor(value).width(900).url()}
              alt={value.alt ?? ''}
              width={900}
              height={600}
              className="w-full object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    // Video embed block
    videoEmbed: ({value}) => {
      const embedUrl = resolveVideoEmbedUrl(value?.url ?? '')

      // YouTube / Vimeo → iframe
      if (embedUrl) {
        return (
          <figure className="my-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                src={embedUrl}
                title={value.caption ?? 'Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            {value.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      }

      // Instagram / TikTok / unknown → external link fallback
      return (
        <div className="my-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
          <p className="mb-2 text-sm text-gray-500">
            {value.caption ?? 'Video eksternal'}
          </p>
          
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            ▶ Tonton Video
          </a>
        </div>
      )
    },

    // File attachment block
    fileAttachment: ({value}) => {
      const fileUrl = value?.file?.asset?.url
      if (!fileUrl) return null
      return (
        <div className="my-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <span className="text-2xl">📎</span>
          
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="font-medium text-teal-700 underline hover:text-teal-900"
          >
            {value.label ?? 'Unduh File'}
          </a>
        </div>
      )
    },

    // Horizontal divider block
    divider: () => (
      <hr className="my-8 border-t border-gray-200" />
    ),
  },

  // Block-level style overrides
  block: {
    normal: ({children}) => (
      <p className="mb-4 text-base leading-relaxed text-gray-700">{children}</p>
    ),
    h2: ({children}) => (
      <h2 className="mb-3 mt-8 text-2xl font-bold text-gray-900">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-900">{children}</h3>
    ),
    blockquote: ({children}) => (
      <blockquote className="my-4 border-l-4 border-teal-400 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },

  // List styles
  list: {
    bullet: ({children}) => (
      <ul className="mb-4 list-disc pl-6 text-gray-700">{children}</ul>
    ),
    number: ({children}) => (
      <ol className="mb-4 list-decimal pl-6 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({children}) => <li className="mb-1">{children}</li>,
    number: ({children}) => <li className="mb-1">{children}</li>,
  },

  // Inline mark styles
  marks: {
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    underline: ({children}) => <span className="underline">{children}</span>,
    link: ({value, children}) => (
      
    <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="text-teal-600 underline hover:text-teal-800"
      >
        {children}
      </a>
    ),
  },
}