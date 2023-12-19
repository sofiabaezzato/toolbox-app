'use client'

import Feed from "@components/Feed"
import LandingPage from "@components/LandingPage"
import { useSession } from "next-auth/react"

export const dynamic = "force-dynamic"

const Home = () => {
  const { status } = useSession()

  return (
    <section className="w-full flex-center flex-col">
        {status === 'authenticated' ?
        <>
          <h1 className="head_text text-center">
              Discover & Share
              <br className="max-md:hidden" />
              <span className="red_gradient text-center"> Powerful Tools</span>
          </h1>
          <p className="desc text-center">
              ToolBox is an open-source database of the most useful tools on the internet
          </p>
          <Feed />
        </>
        :
        <>
          <h1 className="max-w-md mt-5 text-3xl font-extrabold leading-[1.15] text-black sm:text-4xl text-center">
              Discover, Like & Share
              <br className="max-md:hidden" />
              <span className="red_gradient text-center"> the most useful tools on the internet!</span>
          </h1>
          <p className="desc text-center">
            Dive into ToolBox, your open-source arsenal for discovering the right tools at the right time. Curate your favorite tools, share the tech magic with friends, and together, tap into the nerdy brilliance of digital productivity.
          </p>
          <LandingPage />
        </>
        }
    </section>
  )
}

export default Home