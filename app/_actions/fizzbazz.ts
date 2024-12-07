"use server";

import { spawnSync } from "child_process";

export const fizzBazzAction = async (start: number, end: number) => {
  const currentDirectory = process.cwd();
  const python = spawnSync("python3", [
    `${currentDirectory}/python/fizzbazz.py`,
    start.toString(),
    end.toString(),
  ]);

  return python.stdout.toString();
};
