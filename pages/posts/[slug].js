import React from 'react'
import PropTypes from 'prop-types'
import * as contentful from 'contentful';
import Img from '../../components/Img';
import useContentfulImage from '../../hooks/useContentfulImage';

const Post = ({ post  }) => {
    if (!post )return <div>Error! 

    <pre>
        { JSON.stringify(post, null, 2) }
    </pre>
</div>
    const items = post?.items
    const { title, coverImage, description } = items[0]?.fields || {}

    const image = useContentfulImage(coverImage)

    return (
        <div>
            <Img style={{maxHeight: 400}} imageMaxWidth={1200} image={image} />
            <h1>{ title } </h1>

        </div>
    )
}


export async function getStaticPaths() {

    const client = await contentful.createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_KEY
    })

    const blogPosts = await client.getEntries({
        'content_type': 'blogPost'
    })

    const paths = blogPosts.items.map(({ fields: { slug } }) => ({ params: { slug } }))
    return {
        paths,
        fallback: true // See the "fallback" section below
    };
}

// This also gets called at build time
export async function getStaticProps({ params }) {

    const client = await contentful.createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_KEY
    })

    const post = await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': params.slug
      })
      
    // Pass post data to the page via props
    return { props: { post } }
  }
  

Post.propTypes = {

}

export default Post
