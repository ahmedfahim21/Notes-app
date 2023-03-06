import { NoteData } from "../App"
import { NoteForm } from "./NoteForm"
import { Tag } from "../App"

type NewNoteProps = {
    onSubmit: (data: NoteData) =>void
    onAddTag: (tag: Tag) =>void
    availableTags: Tag[]
}

export const NewNote = ({onSubmit,onAddTag,availableTags}:NewNoteProps) => {
    return(
        <div>
            <h1 className="mb-4">New Note</h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
        </div>
    )
}