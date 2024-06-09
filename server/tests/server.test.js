const request = require('supertest');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

// Create the app instance
const app = express();
app.use(cors());
app.use(express.json());

// Mocking Prisma Client
const mockPrisma = {
  quizzes: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
  }
};
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn(() => mockPrisma)
  };
});

// Define the routes
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await mockPrisma.quizzes.findMany({
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

app.get('/api/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await mockPrisma.quizzes.findUnique({
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
    const createdQuiz = await mockPrisma.quizzes.create({
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
    await mockPrisma.quizzes.delete({
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
    const updatedQuiz = await mockPrisma.quizzes.update({
      where: { quiz_id: parseInt(id) },
      data: {
        title,
        description,
        questions: {
          deleteMany: {},
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

// Tests
describe('Quiz API', () => {
  beforeAll(() => {
    // Mock responses
    mockPrisma.quizzes.findMany.mockResolvedValue([
      {
        quiz_id: 1,
        title: 'Sample Quiz',
        description: 'A sample quiz',
        questions: [
          {
            question_id: 1,
            question_text: 'Sample Question?',
            answers: [
              { answer_id: 1, answer_text: 'Answer 1', is_correct: true },
              { answer_id: 2, answer_text: 'Answer 2', is_correct: false }
            ]
          }
        ]
      }
    ]);

    mockPrisma.quizzes.findUnique.mockResolvedValue({
      quiz_id: 1,
      title: 'Sample Quiz',
      description: 'A sample quiz',
      questions: [
        {
          question_id: 1,
          question_text: 'Sample Question?',
          answers: [
            { answer_id: 1, answer_text: 'Answer 1', is_correct: true },
            { answer_id: 2, answer_text: 'Answer 2', is_correct: false }
          ]
        }
      ]
    });

    mockPrisma.quizzes.create.mockResolvedValue({
      quiz_id: 2,
      title: 'New Quiz',
      description: 'A new quiz',
      questions: [
        {
          question_id: 2,
          question_text: 'New Question?',
          answers: [
            { answer_id: 3, answer_text: 'New Answer 1', is_correct: true },
            { answer_id: 4, answer_text: 'New Answer 2', is_correct: false }
          ]
        }
      ]
    });

    mockPrisma.quizzes.delete.mockResolvedValue({});
    mockPrisma.quizzes.update.mockResolvedValue({
      quiz_id: 1,
      title: 'Updated Quiz',
      description: 'An updated quiz',
      questions: [
        {
          question_id: 1,
          question_text: 'Updated Question?',
          answers: [
            { answer_id: 1, answer_text: 'Updated Answer 1', is_correct: true },
            { answer_id: 2, answer_text: 'Updated Answer 2', is_correct: false }
          ]
        }
      ]
    });
  });

  it('should fetch all quizzes', async () => {
    const response = await request(app).get('/api/quizzes');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('title', 'Sample Quiz');
  });

  it('should fetch a single quiz by id', async () => {
    const response = await request(app).get('/api/quizzes/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Sample Quiz');
  });

  it('should create a new quiz', async () => {
    const newQuiz = {
      title: 'New Quiz',
      description: 'A new quiz',
      questions: [
        {
          question_text: 'New Question?',
          answers: [
            { answer_text: 'New Answer 1', is_correct: true },
            { answer_text: 'New Answer 2', is_correct: false }
          ]
        }
      ]
    };

    const response = await request(app).post('/api/quizzes').send(newQuiz);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'New Quiz');
  });

  it('should delete a quiz by id', async () => {
    const response = await request(app).delete('/api/quizzes/1');
    expect(response.status).toBe(204);
  });

  it('should update a quiz by id', async () => {
    const updatedQuiz = {
      title: 'Updated Quiz',
      description: 'An updated quiz',
      questions: [
        {
          question_text: 'Updated Question?',
          answers: [
            { answer_text: 'Updated Answer 1', is_correct: true },
            { answer_text: 'Updated Answer 2', is_correct: false }
          ]
        }
      ]
    };

    const response = await request(app).put('/api/quizzes/1').send(updatedQuiz);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Quiz');
  });
});

module.exports = app;