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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
