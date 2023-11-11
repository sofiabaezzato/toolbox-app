import Feed from "@components/Feed"

const Home = async () => {

  // TODO
  // This is a Server component. I need to fetch data directly from the db.
  const response = await fetch('https://toolbox-app-delta.vercel.app' + '/api/tool', { cache: 'no-store' })
  const data = await response.json()

  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden" />
            <span className="red_gradient text-center"> Powerful Tools</span>
        </h1>
        <p className="desc text-center">
            ToolBox is an open-source database of the most useful tools on the internet
        </p>
        <Feed
          posts={data}
        />
    </section>
  )
}

export default Home