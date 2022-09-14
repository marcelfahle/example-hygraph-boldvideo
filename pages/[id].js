import Link from 'next/link'
import dynamic from 'next/dynamic'
import { GraphQLClient, gql } from 'graphql-request';

const Player = dynamic(() => import('../components/player'), {
  ssr: false,
})

export default function DetailPage({lesson}) {
  console.log(lesson)

  return <div className="py-12 px-8">
    <p className="text-xl font-bold mb-8">
      <Link href="/"><a>Back</a></Link>
    </p>
    <div className="aspect-video">
      <Player src={lesson.boldVideo.data.stream_url} poster={lesson.boldVideo.data.thumbnail} />
    </div>

    <h1 className="text-3xl mt-4">{lesson.title}</h1>
    
    <p className="">{lesson.description}</p>

  </div>

}



export async function getStaticProps({params}) {
  const hygraph = new GraphQLClient(process.env.HYGRAPH_URL);

  const lessonQuery = gql`
    query Lesson($id: ID!) {
      lesson(where: {id: $id}) {
        id
        title
        videoId
        description
        boldVideo {
          data {
            thumbnail
            stream_url
          }
        }
      }
    }
  `
  const { lesson } = await hygraph.request(lessonQuery, {id: params.id})


  return {
    props: {
      lesson
    }
  }
}

export async function getStaticPaths() {
  const hygraph = new GraphQLClient(process.env.HYGRAPH_URL);

  const lessonsQuery = gql`
    {
      lessons {
        id
      }
    }
  `
  const data = await hygraph.request(lessonsQuery)

  const paths = data.lessons.map(lesson => {
    return {
      params: {
        id: lesson.id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}
