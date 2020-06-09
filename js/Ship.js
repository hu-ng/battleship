import { v4 as uuidv4 } from "uuid";

const Ship = (length) => {
  const ship = new Array(length).fill(false);

  const getShip = () => ship;

  const hit = (position) => (ship[position] = true);

  const isHit = () => ship.some((position) => position);

  const isSunk = () => ship.every((position) => position);

  return { getShip, isHit, isSunk, hit };
};

export default Ship;
