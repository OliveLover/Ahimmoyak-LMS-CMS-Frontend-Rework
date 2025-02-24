export const sessionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SESSION":
      const newSessionFormIndex = state.length > 0
        ? Math.max(...state.map(session => session.sessionFormIndex)) + 1
        : 1;

      return [
        ...state,
        {
          sessionId: null,
          sessionIndex: state.length + 1,
          sessionFormIndex: newSessionFormIndex,
          sessionTitle: "",
          contents: [],
        }
      ];

    case "SET_SESSION_ID":
      return state.map((session) =>
        session.sessionFormIndex === action.payload.sessionFormIndex
          ? { ...session, sessionId: action.payload.sessionId }
          : session
      );

    case "UPDATE_SESSION":
      return state.map((session) =>
        session.sessionFormIndex === action.payload.sessionFormIndex
          ? { ...session, sessionTitle: action.payload.sessionTitle }
          : session
      );

    case "REORDER_SESSION":
      const { fromSessionIndex, toSessionIndex } = action.payload;
      const reorderedSessions = [...state];

      const [movedSession] = reorderedSessions.splice(fromSessionIndex, 1);
      reorderedSessions.splice(toSessionIndex, 0, movedSession);

      return reorderedSessions.map((session, index) => ({
        ...session,
        sessionFormIndex: index + 1,
      }));

    case "DELETE_SESSION":
      const updatedSessions = state.filter(
        (session) => session.sessionFormIndex !== action.payload.sessionFormIndex
      );

      return updatedSessions.map((session, index) => ({
        ...session,
        sessionFormIndex: index + 1,
      }));

    case "ADD_CONTENT":
      return state.map((session) =>
        session.sessionFormIndex === action.payload.sessionFormIndex
          ? {
            ...session,
            contents: [
              ...session.contents,
              {
                contentFormIndex:
                  session.contents.length > 0
                    ? Math.max(...session.contents.map((content) => content.contentFormIndex)) + 1
                    : 1,
                contentId: null,
                contentIndex: session.contents.length + 1,
                contentTitle: "",
                contentType: "VIDEO",
                videoPath: "",
                fileId: null,
                fileType: "VIDEO",
                videoDuration: 0,
                fileSize: 0,
                fileName: "",
                quizzes: [],
              },
            ],
          }
          : session
      );

    case "SET_CONTENT_ID":
      return state.map((session) =>
        session.sessionFormIndex === action.payload.sessionFormIndex
          ? {
            ...session,
            contents: session.contents.map((content) =>
              content.contentFormIndex === action.payload.contentFormIndex
                ? { ...content, contentId: action.payload.contentId }
                : content
            ),
          }
          : session
      );

    case "UPDATE_CONTENT":
      return state.map((session) =>
        session.sessionFormIndex === action.payload.sessionFormIndex
          ? {
            ...session,
            contents: session.contents.map((content) =>
              content.contentIndex === action.payload.contentIndex
                ? { ...content, ...action.payload.updatedData }
                : content
            ),
          }
          : session
      );

    case "DELETE_CONTENT":
      return state.map((session) =>
        session.sessionFormIndex === action.payload.sessionFormIndex
          ? {
            ...session,
            contents: session.contents
              .filter((content) => content.contentFormIndex !== action.payload.contentFormIndex)
              .map((content, index) => ({
                ...content,
                contentFormIndex: index + 1,
              })),
          }
          : session
      );

    default:
      return state;
  }
};
