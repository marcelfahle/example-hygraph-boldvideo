import Image from 'next/image'
import Link from 'next/link'
import { GraphQLClient, gql } from 'graphql-request';


export default function Home({lessons, data}) {
  console.log(data)

  return (
    <div>
      <main>
        <section className="w-full text-white p-4">
            <h1 className="text-2xl pl-4">Lessons</h1>
            <ul className="flex flex-wrap">
              {lessons.map(l => (
                <li key={l.id} className="flex flex-col w-80 text-white mx-2 my-4">
                  <Link href={`/${l.id}`}>
                    <a> 
                      <div className="relative aspect-video">
                        <Image layout="fill" alt={l.title} src={l.boldVideo.data.thumbnail}
                          objectFit="cover"
                          objectPosition="center"
                          className="block w-full h-full rounded-lg"
                        />
                      </div>
                      <p>{l.title}</p>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
        </section>
      </main>

      <footer></footer>
    </div>
  )
}



export async function getStaticProps() {
  const hygraph = new GraphQLClient(process.env.HYGRAPH_URL);

  const lessonsQuery = gql`
    {
      lessons {
        id
        title
        videoId
        boldVideo {
          data {
            thumbnail
          }
        }
      }
    }
  `
  const data = await hygraph.request(lessonsQuery)

  const lessons = data.lessons;

  return {
    props: {
      lessons,
      data
    }
  }
}
