import produce from 'immer';

export default function reducer(
  state: { image: string } = { image: '' },
  action: { payload: { image: string }; type: string },
) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_DOG_IMAGE_URL':
      return produce(state, (draft) => {
        draft.image = payload.image;
      });
    default:
      return state;
  }
}
