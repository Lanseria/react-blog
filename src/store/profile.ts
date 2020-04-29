import { IState, AsyncAction } from 'overmind';
import { UserDTO, ProfileResponse } from '../api/models';
import { processErrors } from '../utils';

interface State extends IState {
  loading: boolean;
  users: {
    [username: string]: ProfileResponse;
  };
  errors: string[];
}

export const state: State = {
  loading: false,
  users: {},
  errors: [],
};

const getUser: AsyncAction<string> = async ({ state, effects }, value) => {
  state.profile.loading = true;
  state.profile.errors = [];
  try {
    const {
      data: { profile },
    } = await effects.getUser(value);
    state.profile.users[value] = profile;
  } catch (err) {
    state.profile.errors = processErrors(err);
  }
  state.profile.loading = false;
};

const updateCurrentUser: AsyncAction<UserDTO> = async (
  { effects, state },
  value,
) => {
  state.profile.errors = [];
  try {
    const {
      data: { user },
    } = await effects.updateUser({
      user: value,
    });
    state.auth.currentUser = user;
  } catch (err) {
    state.profile.errors = processErrors(err);
  }
};

export const actions = {
  updateCurrentUser,
  getUser,
};
