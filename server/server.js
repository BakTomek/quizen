const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(cors());
app.use(express.json());

// Get all quizzes
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await prisma.quizzes.findMany({
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Get a single quiz by ID
app.get('/api/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await prisma.quizzes.findUnique({
      where: { quiz_id: Number(id) },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

app.post('/api/quizzes', async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    const createdQuiz = await prisma.quizzes.create({
      data: {
        title,
        description,
        questions: {
          create: questions.map(q => ({
            question_text: q.question_text,
            answers: {
              create: q.answers.map(a => ({
                answer_text: a.answer_text,
                is_correct: a.is_correct
              }))
            }
          }))
        }
      }
    });

    res.json(createdQuiz);
  } catch (error) {
    console.error('Failed to create quiz', error);
    res.status(500).send('Failed to create quiz');
  }
});

app.delete('/api/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.quizzes.delete({
      where: { quiz_id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

app.put('/api/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, questions } = req.body;
  try {
    const updatedQuiz = await prisma.quizzes.update({
      where: { quiz_id: parseInt(id) },
      data: {
        title,
        description,
        questions: {
          deleteMany: {}, // delete existing questions and answers
          create: questions.map(question => ({
            question_text: question.question_text,
            answers: {
              create: question.answers.map(answer => ({
                answer_text: answer.answer_text,
                is_correct: answer.is_correct
              }))
            }
          }))
        }
      }
    });
    res.json(updatedQuiz);
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
