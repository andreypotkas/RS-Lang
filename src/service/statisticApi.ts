import { getCurrentUser } from '../utils/loginUtils';
import { users } from './api';
import initStat from './initStat';
import { IStatistic } from './interfaces';

export async function updateStatistic(body:IStatistic): Promise<IStatistic> {
  const user = getCurrentUser();
  const response = await fetch(`${users}/${user.userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}
export async function getStatistic(): Promise<IStatistic> {
  const user = getCurrentUser();
  const response = await fetch(`${users}/${user.userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 404) {
    return initStat;
  }
  const res = await response.json();

  return {
    learnedWords: res.learnedWords,
    optional: res.optional,
  };
}
export async function increaseAnswersCount(statName:string, correctness:string): Promise<void> {
  const stat = await getStatistic();

  switch (`${statName} ${correctness}`) {
    case 'Audio Challenge correct': stat.optional.day.audioChallenge.correctAnswersCount += 1; break;
    case 'Audio Challenge incorrect': stat.optional.day.audioChallenge.incorrectAnswersCount += 1; break;
    case 'Sprint correct': stat.optional.day.sprint.correctAnswersCount += 1; break;
    case 'Sprint incorrect': stat.optional.day.sprint.incorrectAnswersCount += 1; break;
    case 'Words correct': stat.optional.day.words.correctAnswersCount += 1; break;
    case 'Words incorrect': stat.optional.day.words.incorrectAnswersCount += 1; break;
    default: break;
  }
  await updateStatistic(stat);
}

export async function increaseСorrectAnswersSeries(statName:string, correctStreak: number): Promise<void> {
  const stat = await getStatistic();

  switch (`${statName}`) {
    case 'Audio Challenge':
      if (correctStreak > stat.optional.day.audioChallenge.correctAnswersSeriesLength) {
        stat.optional.day.audioChallenge.correctAnswersSeriesLength = correctStreak;
      }
      break;
    case 'Sprint':
      if (correctStreak > stat.optional.day.sprint.correctAnswersSeriesLength) {
        stat.optional.day.audioChallenge.correctAnswersSeriesLength = correctStreak;
      }
      break;
    default: break;
  }

  await updateStatistic(stat);
}
export async function increaseСountNewWords(statName:string): Promise<void> {
  const stat = await getStatistic();

  switch (`${statName}`) {
    case 'Audio Challenge': stat.optional.day.audioChallenge.countNewWords += 1; break;
    case 'Sprint': stat.optional.day.sprint.countNewWords += 1; break;
    case 'Words': stat.optional.day.words.countNewWords += 1; break;
    default: break;
  }

  updateStatistic(stat);
}
export async function increaseCountLearnedWords(): Promise<void> {
  const stat = await getStatistic();
  stat.optional.day.words.countLearnedWords += 1;
  updateStatistic(stat);
}

export async function decreaseCountLearnedWords(): Promise<void> {
  const stat = await getStatistic();
  stat.optional.day.words.countLearnedWords -= 1;
  updateStatistic(stat);
}

export async function setWinningStreak(gameName: string, streak: number): Promise<void> {
  const stat = await getStatistic();

  switch (`${gameName}`) {
    case 'Audio Challenge': stat.optional.day.audioChallenge.correctAnswersSeriesLength = streak; break;
    case 'Sprint': stat.optional.day.sprint.correctAnswersSeriesLength = streak; break;
    default: break;
  }

  updateStatistic(stat);
}
