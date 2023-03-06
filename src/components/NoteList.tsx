import { useMemo, useState } from "react"
import { Link} from "react-router-dom"
import ReactSelect from "react-select"
import { Note,Tag } from "../App"

type NoteListProp= {
    availableTags: Tag[]
    notes: Note[]
}

type SimplifiedNote ={
    tags: Tag[],
    title: string,
    id: string
}

export function NoteList({availableTags,notes}:NoteListProp){
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")

    const filteredNotes = useMemo(()=>{
        return notes.filter(note => {
            return (
                (title=="" ||
                note.title.toLowerCase().includes(title.toLocaleLowerCase()))&& 
                (selectedTags.length === 0 ||
                selectedTags.every(tag => 
                note.tags.some(noteTag => noteTag.id === tag.id)
                ))
            )
        })
    },[title,selectedTags,notes])

    return(
        <div className="m-4">
            <h1 className="text-3xl p-4">Notes</h1>
            <div className="flex justify-end">
            <Link to="/new">
            <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-blue-500 border-2 focus:outline-none focus:shadow-outline">
                Create
            </button>
            </Link>
            <button className="mx-2 bg-white hover:bg-blue-100 text-black font-bold py-2 px-4 rounded border-black-100 border-2 focus:outline-none focus:shadow-outline">
                Edit Tag
            </button>
            </div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="w-full flex">
            <div className="m-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
                Title
            </label>
            <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
             value={title} onChange={e => setTitle(e.target.value)}/>
            </div> 
            <div className="m-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
                Tags
            </label>
            <ReactSelect isMulti
            
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
            </form>
            <div className="flex flex-wrap">
            {
                filteredNotes.map(note => (
                    <div className="m-2 p-2 ">
                        <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                    </div>
                ))
            }  
            </div>
        </div>
    )
}

function NoteCard({id,title,tags}: SimplifiedNote){
    
    return (<Link to={`/${id}`}>
        <div className="shadow h-[200px] w-[300px] border rounded-lg border-gray-300 p-4 hover:scale-110 items-center">
            <span className="text-2xl justify-center">{title}</span>
            <div>
            {tags.length > 0 && (
                    <div className="p-2 m-2 flex-wrap ">{
                        tags.map(tag => (
                            <div className="bg-blue-200 m-1 p-1 rounded-md">{tag.label}</div>
                        ))}
                        </div>
                )}
            </div>
        </div>
    </Link>)
}