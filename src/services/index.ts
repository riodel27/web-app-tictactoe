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

export async function getGamesSession(query: {
  limit: number;
  page: number;
  populate?: string;
  sortBy?: string;
}): Promise<GameSessionResultData> {
  try {
    const limit = query?.limit ? JSON.stringify(query.limit) : '100';
    const page = query?.page ? JSON.stringify(query.page) : '1';
    const populate = query.populate ?? 'rounds';
    const sortBy = query?.sortBy ?? 'createdAt:desc';

    const queryParams = new URLSearchParams({
      populate: populate,
      sortBy: sortBy,
      limit: limit,
      page: page,
    });

    const url = `${process.env.API_URL}/api/game/list?${queryParams}`;

    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Oops! Something went wrong. Please try again later.');
  }
}
