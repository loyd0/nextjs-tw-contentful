import Nav from '../components/nav'
import * as contentful from 'contentful';
import Img from '../components/Img';
import Link from 'next/link';
import useContentfulImage from '../hooks/useContentfulImage';

function IndexPage({ posts }) {

  return (
    <>
      <Nav />
      <h1 className="text-center text-4xl mb-12">Home</h1>
      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-2 ">
      
        {posts.map(({ title, slug, coverImage }) => {
          const image = useContentfulImage(coverImage)
          return <Link key={slug} href={`/posts/${slug}`}>
            <div className="max-w-sm hover:shadow-xl px-4 py-2 rounded cursor-pointer">
              <Img imageMaxWidth={300} image={image} />
              <h2 className="mt-2">{title} </h2>
            </div>
          </Link>
        })}

      </div>

    </>
  )
}


// This function gets called at build time
export async function getStaticProps() {



  try {
    let client = await contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,

      accessToken: process.env.CONTENTFUL_DELIVERY_KEY
    })

    const blogPosts = await client.getEntries({
      'content_type': 'blogPost'
    })
    const posts = blogPosts.items.map(({ fields: { title, slug, coverImage } }) => ({ title, slug, coverImage }))

    return {
      props: {
        posts
      },
    }
  } catch (e) {
    console.log(e)
  }


  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
    }
  }
}

export default IndexPage