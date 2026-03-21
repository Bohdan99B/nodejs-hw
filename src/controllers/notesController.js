import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const notesQuery = Note.find().where('userId').equals(req.user._id);
  const totalNotesQuery = Note.find().where('userId').equals(req.user._id);

  if (tag) {
    notesQuery.where('tag').equals(tag);
    totalNotesQuery.where('tag').equals(tag);
  }

  if (typeof search === 'string' && search.length > 0) {
    notesQuery.find({ $text: { $search: search } });
    totalNotesQuery.find({ $text: { $search: search } });
  }

  const skip = (page - 1) * perPage;

  notesQuery.skip(skip).limit(perPage);

  const [notes, totalNotes] = await Promise.all([
    notesQuery.exec(),
    totalNotesQuery.countDocuments().exec()
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOne({
    _id: noteId,
    userId: req.user._id
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
    userId: req.user._id
  });

  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      userId: req.user._id
    },
    req.body,
    {
      returnDocument: 'after',
      runValidators: true
    }
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};
