import React from 'react'


// Lines
export const Hr = ({ children, ...props }) => <hr {...props} className="my-16 max-w-2xl mx-auto" />

// Links
export const A = ({ children, ...props }) => <LinkTo className="font-bold text-green-800" linkTo={props.href}>{children}</LinkTo>


// Lists
export const Ul = ({ children, ...props }) => <ul {...props} className="pl-12 md:pl-16 list-disc my-12 max-w-3xl mx-auto ">{children}</ul>
export const Ol = ({ children, ...props }) => <ul {...props} className="pl-12 md:pl-16 list-decimal my-12 max-w-3xl mx-auto ">{children}</ul>
export const Li = ({ children, ...props }) => <li {...props}>{children}</li>


// Code 
export const Pre = ({ children, ...props }) => {
    return <div className="bg-gray-900 rounded-md max-w-3xl  lg:p-8 p-4 xl:p-12  mx-4 md:mx-auto my-12 text-gray-200 overflow-y-scroll ">
        <pre >
            {children}
        </pre>
    </div>
}

// Code 
export const Code = ({ children, ...props }) => <code className="bg-gray-900 text-green-400 py-1 px-2 mx-1 rounded-md font-bold " {...props}  >{children}</code>

// Block quote
export const Quote = ({ children }) => <div className="pl-4">
    <h4 className="text-xl md:px-8 text-justify border-solid border-l-4 border-highlight ">{children}</h4>
</div>
// Images
export const MarkDownImage = (props) => {

    return <img className="my-12" src={props.src} alt={props.alt} />
}
export const RichInlineImage = ({ image, children, alt, ...props }) => {
    if (image) {
        const width = image.details.image.width
        return <figure className="my-8">
            <Img
                className="w-full"
                alt={alt}
                {...props}
                style={{ maxHeight: 600 }}
                fluid={{
                    aspectRatio: width / image.details.image.height,
                    src: image.url + '?w=1080px&q=80',
                    srcSet: ` 
                ${image.url}?w=${width / 4}&&q=80 ${width / 4}w,
                ${image.url}?w=${width / 2}&&q=80 ${width / 2}w,
                ${image.url}?w=${width}&&q=80 ${width}w,
                ${image.url}?w=${width * 1.5}&&q=80 ${width * 1.5}w,
                ${image.url}?w=1000&&q=80 1000w,
            `,
                    sizes: '(max-width: 1080px) 100vw, 1080px'
                }} />
            {alt && <figcaption className="block text-sm text-center my-2 italic">{alt}</figcaption>}
        </figure>
    }
    return <></>
}

export const RichInlinePost = ({ node, children }) => {

    const { fields } = node.data.target
    const title = fields.title["en-US"]
    const subtitle = fields.subtitle["en-US"]
    const slug = `/posts/${fields.slug["en-US"]}`
    const imageFields = fields.coverImage ? fields.coverImage["en-US"].fields : false

    if (imageFields) {
        const image = imageFields.file["en-US"]
        const width = image.details.image.width
        const fluid = {
            aspectRatio: width / image.details.image.height,
            src: image.url + '?w=600&q=80',
            srcSet: ` 
                ${image.url}?w=${width / 4}&&q=80 ${width / 4}w,
                ${image.url}?w=${width / 2}&&q=80 ${width / 2}w,
                ${image.url}?w=${width}&&q=80 ${width}w,
                ${image.url}?w=${width * 1.5}&&q=80 ${width * 1.5}w,
                ${image.url}?w=1000&&q=80 1000w,
            `,
            sizes: '(max-width: 600px) 100vw, 600px'
        }
        return <div className="px-4 md:px-12 max-w-4xl mx-auto">
            {/* <PostCard coverImage={{ fluid }} linkTo={slug} header={title} subHeader={subtitle} className="my-16" /> */}
        </div>
    }
    return <div className="px-4 md:px-12 max-w-4xl mx-auto">
        {/* <PostCard linkTo={slug} header={title} subHeader={subtitle} className="my-16" /> */}
    </div>

}