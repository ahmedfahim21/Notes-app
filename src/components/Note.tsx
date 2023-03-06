import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";

type NoteProps = {
    onDelete: (id: string) => void
}

export function Note({onDelete}:NoteProps ){
    const note = useNote()
    const navigate = useNavigate()

    return <>
        <div>
            <h1 className="text-4xl mx-8">{note.title}</h1>
            <div className="flex justify-end">
            <Link to={`/${note.id}/edit`}>
            <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-blue-500 border-2 focus:outline-none focus:shadow-outline">
                Edit
            </button>
            </Link>
            <button className="mx-2 bg-white hover:bg-red-100 text-red-500 font-bold py-2 px-4 rounded border-red-300 border-2 focus:outline-none focus:shadow-outline" onClick={()=>{
                onDelete(note.id) 
                navigate("/")
            }}>
                Delete
            </button>
            <Link to="/">
            <button className="mx-2 bg-white hover:bg-blue-100 text-black font-bold py-2 px-4 rounded border-black-100 border-2 focus:outline-none focus:shadow-outline">
                Back
            </button>
            </Link>
            </div>
            {note.tags.length > 0 && (
                    <div className="p-2 m-2 flex-wrap ">{
                        note.tags.map(tag => (
                            <div className="bg-blue-200 m-1 p-1 rounded-md">{tag.label}</div>
                        ))}
                        </div>
            )}
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
            
        </div>
    </>
}