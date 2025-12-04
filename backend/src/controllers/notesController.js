import Note from "../model/Note.js"

// TODO: can create wrapper for try {} catch(e) {} blocks

// underscore convention ?? <-- for unused params?
export async function getAllNotes(_, res) {
   try {
      // can add filter in .find()
      const notes = await Note.find().sort({ createdAt: -1 }); // -1: newest first, 1: oldest first
      res.status(200).json(notes);
   } catch (error) {
      console.error("Error in getAllNotes controller", error);
      res.status(500).json({ message: "Internal server error" });
   }
}

export async function getNoteById(req, res) {
   try {
      const note = await Note.findById(req.params.id);
      if(!note) return res.status(404).json({ message: "Note not found" });
      res.status(200).json(note);
   } catch(error) {
      console.error("Error in getNoteById controller", error);
      res.status(500).json({ message: "Internal server error" });
   }
}

export async function createNote(req, res) {
   try {
      const {title, content} = req.body;
      const note = new Note({ title, content });

      const savedNote = await note.save();
      res.status(201).json(savedNote);
   } catch (error) {
      console.error("Error in createNote controller", error);
      res.status(500).json({ message: "Internal server error" });
   }
}

export async function updateNote(req, res) {
   try {
      const { title, content } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(
         req.params.id,
         { title, content },
         { new: true } // specifies to return the obj. after update is performed
      );

      if(!updatedNote) return res.status(404).json({ message: "Note not found" })

      res.status(200).json(updatedNote);
   } catch(error) {
      console.error("Error in updateNote controller", error);
      res.status(500).json({ message: "Internal server error" });
   }
}

export async function deleteNote(req, res) {
   try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      if(!deletedNote) return res.status(404).json({ message: "Note not found" });
      res.status(200).json({ message: "Note deleted successfully!" });
   } catch(error) {
      console.error("Error in deleteNote controller");
      res.status(500).json({ message: "Internal server error" });
   }
}