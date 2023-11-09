import Feed from "@components/Feed"


const Home = () => {
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
        <Feed />
    </section>
  )
}
export const revalidate = 0

export default Home