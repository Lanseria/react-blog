import { IConfig, createOvermind } from 'overmind';
import { createHook } from 'overmind-react';

import * as auth from './auth';
import * as api from '../api';

const config = {
  ...auth,
  effects: api,
};

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const overmind = createOvermind(config);

export const useOvermind = createHook<typeof config>();