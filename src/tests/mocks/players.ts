export const playerWithoutRoom = {
  id: 28,
  name: 'TRINITY',
  status: 'ALIVE',
  room: null,
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
};

export const adminPlayerWithRoom = {
  id: 28,
  name: 'TRINITY',
  status: 'ALIVE',
  room: {
    id: 17,
    code: 'SOSPC',
    name: "TRINITY's room",
    status: 'PENDING',
    missions: [],
  },
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
};
