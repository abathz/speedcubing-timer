import { create } from 'zustand';
import { combine } from 'zustand/middleware';

interface ITimeLogStore {
    times: string[];
    pushTimeLog: (timeLog: string) => void;
}

export const useTimeLogStore = create<ITimeLogStore>()(
    combine({ times: [] as ITimeLogStore['times'] }, (set) => ({
        pushTimeLog: (time: string) => {
            set((prev) => ({ times: [...prev.times, time] }));
        },
    }))
);
