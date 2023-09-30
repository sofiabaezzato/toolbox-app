import Link from "next/link"
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"
import Image from "next/image";

const TagsInput = ({ defaultTags = [], selected }) => {
  const [tags, setTags] = useState(defaultTags)
  
  useEffect(() => {
    setTags(defaultTags);
  }, [defaultTags]);

  const updateTags = (newTags) => {
    setTags(newTags);
    selected(newTags);
  };

  const addTags = (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      const newTag = e.target.value.trim(); // Remove leading/trailing spaces
      if (newTag) {
        // Only add non-empty tags
        updateTags([...tags, newTag]);
        e.target.value = "";
      }
    }
  };

  const removeTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    updateTags(updatedTags);
  };

  return (
    <div>
      <ul className="flex gap-2">
        {tags.map((tag, index) => (
          <li key={index} className="badge flex flex-center gap-2 justify-between">
            <span
            className="text-xs"
            >{tag}</span>
            <div className="bg-white rounded-full p-0.5 cursor-pointer"
            onClick={() => removeTag(index)}
            >
              <Image
                src='/icons/close.svg'
                width={12}
                height={12}
                alt="close"
              />
            </div>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={addTags}
        placeholder="Press spacebar to add a new tag"
        className="form_input"
      />
    </div>
  ) 
}

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const currentUrl = usePathname()

  const selected = (tags) => {
    setPost({...post, tag: tags})
  }

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
            <span className="font-normal">(#team-work, #no-code, #marketing, #productivity)</span>
          </span>

          <TagsInput selected={selected} defaultTags={post.tag}/>
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