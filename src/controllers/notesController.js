import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;
  const skip = (page - 1) * perPage;
  const notesQuery = Note.find();
  const totalNotesQuery = Note.countDocuments();

  if (tag) {
    notesQuery.where('tag').equals(tag);
    totalNotesQuery.where('tag').equals(tag);
  }

  if (typeof search === 'string' && search.length > 0) {
    const textSearchCondition = { $text: { $search: search } };
    notesQuery.find(textSearchCondition);
    totalNotesQuery.where(textSearchCondition);
  }

  const [notes, totalNotes] = await Promise.all([
    notesQuery.skip(skip).limit(perPage),
    totalNotesQuery
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
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);

  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndDelete(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndUpdate(noteId, req.body, {
    returnDocument: 'after',
    runValidators: true
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};
