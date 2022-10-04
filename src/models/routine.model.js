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
