import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const filter = {};

  if (tag) {
    filter.tag = tag;
  }

  if (typeof search === 'string' && search.length > 0) {
    filter.$text = { $search: search };
  }

  const totalNotes = await Note.countDocuments(filter);
  const totalPages = Math.ceil(totalNotes / perPage);
  const skip = (page - 1) * perPage;

  const notes = await Note.find(filter).skip(skip).limit(perPage);

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
    new: true,
    runValidators: true
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};
