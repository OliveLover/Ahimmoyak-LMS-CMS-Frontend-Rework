export const sessionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SESSION":
      const newSessionFormIndex = state.length > 0
        ? Math.max(...state.map(session => session.sessionFormIndex)) + 1
        : 1;

      return [
        ...state,
        {
          sessionId: state.length + 1,
          sessionIndex: state.length + 1,
          sessionFormIndex: newSessionFormIndex,
          sessionTitle: "",
        }
      ];

    case "UPDATE_SESSION":
      return state.map((session) =>
        session.sessionFormIndex === action.payload.sessionFormIndex
          ? { ...session, sessionTitle: action.payload.sessionTitle }
          : session
      );

    case "DELETE_SESSION":
      const updatedSessions = state.filter(
        (session) => session.sessionFormIndex !== action.sessionFormIndex
      );

      return updatedSessions.map((session, index) => ({
        ...session,
        sessionFormIndex: index + 1,
      }));

    default:
      return state;
  }
};
