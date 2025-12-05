import { StoreApi, UseBoundStore } from "zustand";

export const createSelectors = <State extends object, S extends UseBoundStore<StoreApi<State>>>(
  _store: S
) => {
  type UseMap = { [K in keyof State]: () => State[K] };

  const store = _store as S & { use: Partial<UseMap> };
  store.use = {} as Partial<UseMap>;

  const state = store.getState();
  for (const k of Object.keys(state) as Array<keyof State>) {
    const key = k as keyof State;
    (store.use as Partial<UseMap>)[key] = () => store((s) => s[key]);
  }

  return store as S & { use: UseMap };
};

export default createSelectors;