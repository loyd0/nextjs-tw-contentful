import React from 'react'

import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import LinkTo from '../components/LinkTo'
import { RichInlineImage, RichInlinePost, Hr, Quote} from './Components'




const options = {
  renderMark: {
  [MARKS.BOLD]: text => <span className="font-bold">{text}</span>,
    [MARKS.CODE]: text => <pre className="text-gray-600 bg-gray-300 px-2 py-1 rounded mb-0" style={{ fontFamily: 'monospace' }}>  {text}</pre>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => <h2>{children}</h2>,
    [BLOCKS.HEADING_2]: (node, children) => <h3>{children}</h3>,
    [BLOCKS.HEADING_3]: (node, children) => <h4>{children}</h4>,
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-8">{children}</p>,
    [BLOCKS.QUOTE]: (node, children) => <Quote>{children}</Quote>,
    [BLOCKS.HR]: () => <Hr />,
    [BLOCKS.LIST_ITEM]: (node, children) => <li className="md:pl-2">{children}</li>,
    [BLOCKS.UL_LIST]: (node, children) => <ul className="pl-12 md:pl-16 list-disc mb-12 max-w-3xl mx-auto ">{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol className="pl-12 md:pl-16 list-decimal mb-12 max-w-3xl mx-auto">{children}</ol>,
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {

      const photo = node.data.target.fields.photo || false
      const isInlinePhoto = node.data.target.sys.contentType.sys.contentful_id === "inlinePostPhoto" || false
      const isPost = node.data.target.sys.contentType.sys.contentful_id === "post" || false
      if (isInlinePhoto) {
        const image = photo["en-US"].fields.file["en-US"]
        const alt = photo["en-US"].fields?.title?.["en-US"]
        return <RichInlineImage image={image} alt={alt || false} className="max-w-3xl mx-auto " />
      }

      if (isPost) {
        return <RichInlinePost node={node} />
      }
      return ""

    },
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      if (!node.data.target || !node.data.target.fields.file) return ""
      if (node.data.target.fields.file["en-US"].contentType.includes('image')) {
        const image = node.data.target.fields.file['en-US']
        const alt = node.data.target.fields?.title?.["en-US"]
        return <RichInlineImage image={image} alt={alt}/>
      }
    },
    [INLINES.HYPERLINK]: (node, children) => <LinkTo linkTo={node.data.uri} className="text-highlight underline">{children} </LinkTo>,
    [INLINES.EMBEDDED_ENTRY]: (node, children) => {
      if (node.data.target.sys.contentType.sys.contentful_id === "inlinePostPhoto") {
        // This stupid object for determining if there is an image at the end
        if (node.data.target.fields.photo["en-US"].fields.file["en-US"].contentType.includes('image')) {
          const image = node.data.target.fields.photo["en-US"].fields.file["en-US"]
          return <RichInlineImage image={image} className="max-w-3xl my-8 mx-auto" />
        }


      }
    },
  },
}
const RichText = React.forwardRef(({ text, className }, ref) => (
  <div ref={ref} className={className}>
    {documentToReactComponents(text, options)}
  </div>
))

export default RichText

