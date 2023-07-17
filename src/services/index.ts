import { CreateGameSessionBody, GameSessionResultData } from '@/types';

export async function createGameSession(values: CreateGameSessionBody) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/game/add`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Oops! Something went wrong. Please try again later.');
  }
}

export async function getGamesSession(
  query = {
    populate: 'rounds',
    sortBy: 'createdAt:desc',
    limit: '10000',
    page: '1',
  }
): Promise<GameSessionResultData> {
  try {
    const queryParams = new URLSearchParams(query);

    const url = `${process.env.API_URL}/api/game/list?${queryParams}`;

    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Oops! Something went wrong. Please try again later.');
  }
}
