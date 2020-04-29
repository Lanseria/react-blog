import { IState, AsyncAction } from 'overmind';
import { UserDTO, ProfileResponse } from '../api/models';
import { formatErrors } from '../utils';

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
    state.profile.errors = formatErrors(err);
  } finally {
    state.profile.loading = false;
  }
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
    state.profile.errors = formatErrors(err);
  }
};

const followUser: AsyncAction<string> = async (
  { actions, state, effects },
  username,
) => {
  try {
    await effects.followUser(username);
  } catch (err) {
    state.profile.errors = formatErrors(err);
  } finally {
    actions.profile.getUser(username);
  }
};

const unfollowUser: AsyncAction<string> = async (
  { actions, state, effects },
  username,
) => {
  try {
    await effects.unfollowUser(username);
  } catch (err) {
    state.profile.errors = formatErrors(err);
  } finally {
    actions.profile.getUser(username);
  }
};

export const actions = {
  updateCurrentUser,
  getUser,
  followUser,
  unfollowUser,
};
