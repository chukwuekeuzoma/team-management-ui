import { create } from "zustand";
import { Team } from "@/types/teams";
import { teams as initialTeams } from "@/data/teams";

type State = {
  teams: Team[];
  loading: boolean;
  error?: string | null;
  fetchTeams: () => Promise<void>;
  createTeam: (
    payload: Omit<Team, "id" | "createdAt" | "updatedAt">
  ) => Promise<Team>;
  updateTeam: (id: string, patch: Partial<Team>) => Promise<Team>;
  deleteTeam: (id: string) => Promise<void>;
  simulateFailureNextCall: boolean;
  setSimulateFailureNextCall: (v: boolean) => void;
};

const fakeDelay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

export const useTeamsStore = create<State>((set, get) => ({
  teams: initialTeams,
  loading: false,
  error: null,
  simulateFailureNextCall: false,
  setSimulateFailureNextCall: (v: boolean) =>
    set({ simulateFailureNextCall: v }),

  fetchTeams: async () => {
    set({ loading: true, error: null });
    try {
      await fakeDelay(500);
      if (get().simulateFailureNextCall) {
        set({ simulateFailureNextCall: false });
        throw new Error("Simulated fetch failure");
      }
      set({ teams: get().teams, loading: false });
    } catch (err: any) {
      set({ error: err.message ?? "Unknown error", loading: false });
      throw err;
    }
  },

  createTeam: async (payload) => {
    set({ loading: true, error: null });
    try {
      await fakeDelay(500);
      if (get().simulateFailureNextCall) {
        set({ simulateFailureNextCall: false });
        throw new Error("Simulated create failure");
      }
      const id = `team-${Math.floor(Math.random() * 1_000_000)}`;
      const now = new Date().toISOString();
      const newTeam: Team = { id, createdAt: now, updatedAt: now, ...payload };
      set((s) => ({ teams: [newTeam, ...s.teams], loading: false }));
      return newTeam;
    } catch (err: any) {
      set({ error: err.message ?? "Unknown error", loading: false });
      throw err;
    }
  },

  updateTeam: async (id, patch) => {
    set({ loading: true, error: null });
    try {
      await fakeDelay(500);
      if (get().simulateFailureNextCall) {
        set({ simulateFailureNextCall: false });
        throw new Error("Simulated update failure");
      }
      const now = new Date().toISOString();
      let updated: Team | undefined;
      set((s) => {
        const teams = s.teams.map((t) => {
          if (t.id === id) {
            updated = { ...t, ...patch, updatedAt: now };
            return updated!;
          }
          return t;
        });
        return { teams, loading: false };
      });
      if (!updated) throw new Error("Team not found");
      return updated;
    } catch (err: any) {
      set({ error: err.message ?? "Unknown error", loading: false });
      throw err;
    }
  },

  deleteTeam: async (id) => {
    set({ loading: true, error: null });
    try {
      await fakeDelay(500);
      if (get().simulateFailureNextCall) {
        set({ simulateFailureNextCall: false });
        throw new Error("Simulated delete failure");
      }
      set((s) => ({
        teams: s.teams.filter((t) => t.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message ?? "Unknown error", loading: false });
      throw err;
    }
  },
}));
