import { FormEvent, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "../App"
import {v4 as uuidV4} from "uuid"

type NoteFormProps = {
    onSubmit : (data: NoteData) => void
    onAddTag: (tag: Tag) =>void
    availableTags: Tag[]
}& Partial<NoteData>

export const NoteForm = ({onSubmit,onAddTag,availableTags, title="", markdown="", tags= [],}:NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)  
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()

    function handleSubmit(e: FormEvent){
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        })

        navigate("..")
    }

    return( 
        <>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="w-full flex">
            <div className="m-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
                Title
            </label>
            <input ref={titleRef} defaultValue={title} required className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title"/>
            </div> 
            <div className="m-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
                Tags
            </label>
            <CreatableReactSelect isMulti
            onCreateOption={label => {
                const newTag = {id: uuidV4(), label}
                onAddTag(newTag)
                setSelectedTags(prev => [...prev, newTag])
            }}
             value={selectedTags.map(tag =>{
                return{ label: tag.label, value: tag.id}
            })} 
            options={availableTags.map(tag=>{
                return {label: tag.label, value: tag.id}
            })}
            onChange={tags => {
                setSelectedTags(tags.map(tag=>{
                    return{label: tag.label, id: tag.value}
                }))
            }}/>
            </div>
            </div>
            <div className="m-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
                Body
            </label>
            <textarea ref={markdownRef} defaultValue={markdown} required className="w-full h-[400px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="body" />
            </div>
            
            <div className="m-4 flex items-center justify-end">
            <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-blue-500 border-2 focus:outline-none focus:shadow-outline" type="submit">
                Save
            </button>
            <Link to="..">
            <button className="m-2 bg-white hover:bg-blue-100 text-black font-bold py-2 px-4 rounded border-black-100 border-2 focus:outline-none focus:shadow-outline" type="button">
                Cancel
            </button>
            </Link>
            </div>
  </form>
        </>
    )
}