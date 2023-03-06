import { NoteData } from "../App"
import { NoteForm } from "./NoteForm"
import { Tag } from "../App"
import { useNote } from "./NoteLayout"

type EditNoteProps = {
    onSubmit: (id:string, data: NoteData) =>void
    onAddTag: (tag: Tag) =>void
    availableTags: Tag[]
}

export const EditNote = ({onSubmit,onAddTag,availableTags}:EditNoteProps) => {
    const note = useNote()
    return(
        <div>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm title={note.title}
            onSubmit={data=>onSubmit(note.id,data)} onAddTag={onAddTag} availableTags={availableTags}/>
        </div>
    )
}