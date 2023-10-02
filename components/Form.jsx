import Link from "next/link"
import { usePathname } from "next/navigation";
import Image from "next/image";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

  const removeTag = (indexToRemove) => {
    const updatedPost = { ...post }
    updatedPost.tag.splice(indexToRemove, 1)
    setPost(updatedPost);
  };

  const addTags = (e) => {
    let newTag = e.target.value.trim().toLowerCase().replace(/,/g, "");
    if (newTag) {
      setPost((prevPost) => ({ ...prevPost, tag: [...prevPost.tag, newTag] }))
    }
    e.target.value = "";
  }

  const currentUrl = usePathname()
  
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="red_gradient">
          {type} Tool   
        </span>
      </h1>
      <p className="desc text-left max-w-md">{type} and share amazing tools with the world.</p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tool name
          </span>

          <input
            type="text"
            value={post.toolName}
            onChange={(e) => setPost({...post, toolName: e.target.value})}
            placeholder="Write your tool name here..." required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description
          </span>

          <textarea
            value={post.description}
            onChange={(e) => setPost({...post, description: e.target.value})}
            placeholder="Add a brief description of the tool" required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {' '}
          </span>

          
          <ul className="flex gap-1 flex-wrap my-1">
              {post.tag.map((tag, index) => (
                <li key={index} className="badge flex flex-center ">
                  <span
                  className="text-xs"
                  >{tag}</span>
                  <div 
                  onClick={() => removeTag(index)}
                  >
                    <Image
                      src='/icons/close.svg'
                      width={18}
                      height={18}
                      alt="close"
                      className="p-0.5 cursor-pointer"
                    />
                  </div>
                </li>
              ))}
            </ul>
            <input
              type="text"
              onKeyUp={(e) => (e.key === " " || e.key ==="," ? addTags(e) : null)}
              
              placeholder="team-work, no-code, AI, productivity..."
              className="form_input"
            />
            <em
            className="font-satoshi text-sm text-gray-500 pl-3">
              Press spacebar to add a new tag</em>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Website
          </span>

          <input
            type="url"
            value={post.url}
            onChange={(e) => setPost({...post, url: e.target.value})}
            placeholder="https://www.toolbox.io" required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Pricing
          </span>

          <select
            value={post.price}
            onChange={(e) => setPost({...post, price: e.target.value})}
            className="form_select"
          >
            <option value="free">Free</option>
            <option value="pay">Pay</option>  
          </select>
        </label>


        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
          href={currentUrl === '/add-tool' ? '/' : '/profile' }
          className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-red-600 rounded-full text-white font-semibold"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form