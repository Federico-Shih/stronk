import abdominales from "../assets/abdominales.jpg";

export class Exercise {
  constructor(id, title, img_url, reps, duration) {
    this.id = id;
    this.title = title;
    this.img_url = img_url;
    this.reps = reps;
    this.duration = duration;
  }
}

export class Cycle {
  constructor(cycleTitle, cycleTimes, ...exercises) {
    this.title = cycleTitle;
    this.times = cycleTimes;
    this.exercises = exercises;
  }
}

const exerciseMock = new Exercise("data", "Abdominales", abdominales, 10, 2);
const exerciseMock2 = new Exercise(
  "data",
  "Abdominales",
  abdominales,
  undefined,
  2
);
const exerciseMock3 = new Exercise("data", "Abdominales", abdominales, 10);

export const cycle1 = new Cycle(
  "Descanso",
  10,
  exerciseMock,
  exerciseMock2,
  exerciseMock3
);

export const cycle2 = new Cycle("Activo", 3, exerciseMock, exerciseMock2);

export const routine = {
  title: "Abdominales en 15 minutos",
  description:
    "Con esta rutinar abdominales en sólo 15 minutoara el fulbo, Con esta rutina podrás entrenar abdominales en sólo 15 minutos! Perfecto para el fulbo, Con esta rutina podrás entrenar abdominales en sólo 15 minutos! Perfecto para el fulbo, Con esta rutina podrás entales en sólo 15 minutos! Perfecto para el fulbo",
  author: {
    img: abdominales,
    name: "Lionel Messi",
    username: "lionel-messi"
  },
  categories: [
    { name: "Core", id: "core" },
    { name: "Principiante", id: "noob" }
  ],
  cycles: [cycle1, cycle2, cycle1],
  rating: 4.3,
  liked: true
};
