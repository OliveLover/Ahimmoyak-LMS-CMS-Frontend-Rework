export const sessionReducer = (state, action) => {
  switch (action.type) {
    case "SET_SESSIONS":
      return action.payload.sessions.map((session) => ({
        ...session,
        sessionFormIndex: session.sessionIndex,
        contents: session.contents
          .sort((a, b) => a.contentIndex - b.contentIndex)
          .map((content) => ({
            ...content,
            contentFormIndex: content.contentIndex,
            quizzes: content.quizzes
              ? content.quizzes.map((quiz) => ({
                ...quiz,
                quizFormIndex: quiz.quizIndex,
              }))
              : [],
          })),
      }));

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

      const [movedSession] = reorderedSessions.splice(fromSessionIndex - 1, 1);
      reorderedSessions.splice(toSessionIndex - 1, 0, movedSession);

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
                contentIndex:
                  session.contents.length > 0
                    ? Math.max(...session.contents.map((content) => content.contentIndex)) + 1
                    : 1, // ✅ 가장 큰 contentIndex + 1 로 설정
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

    case "REORDER_CONTENT":
      const { fromContentIndex, toContentIndex, sessionFormIndex } = action.payload;

      return state.map((session) =>
        session.sessionFormIndex === sessionFormIndex
          ? {
            ...session,
            contents: (() => {
              const reorderedContents = [...session.contents];

              const [movedContent] = reorderedContents.splice(fromContentIndex - 1, 1);
              reorderedContents.splice(toContentIndex - 1, 0, movedContent);

              return reorderedContents.map((content, index) => ({
                ...content,
                contentFormIndex: index + 1,
              }));
            })(),
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

    case "ADD_QUIZ":
      return state.map((session) =>
        session.sessionFormIndex === action.payload.sessionFormIndex
          ? {
            ...session,
            contents: session.contents.map((content) =>
              content.contentFormIndex === action.payload.contentFormIndex
                ? {
                  ...content,
                  quizzes: [
                    ...content.quizzes,
                    {
                      quizId: null,
                      quizFormIndex:
                        content.quizzes.length > 0
                          ? Math.max(...content.quizzes.map((quiz) => quiz.quizFormIndex)) + 1
                          : 1,
                      quizIndex: content.quizzes.length + 1,
                      question: "",
                      options: ["", ""],
                      answer: 0,
                      explanation: "",
                    },
                  ],
                }
                : content
            ),
          }
          : session
      );

    case "SET_QUIZ_ID":
      return state.map((session) =>
        session.sessionFormIndex === action.payload.sessionFormIndex
          ? {
            ...session,
            contents: session.contents.map((content) =>
              content.contentFormIndex === action.payload.contentFormIndex
                ? {
                  ...content,
                  quizzes: content.quizzes.map((quiz) =>
                    quiz.quizFormIndex === action.payload.quizFormIndex
                      ? { ...quiz, quizId: action.payload.quizId }
                      : quiz
                  ),
                }
                : content
            ),
          }
          : session
      );

    case "UPDATE_QUIZ":
      return state.map((session) =>
        session.sessionFormIndex === action.payload.sessionFormIndex
          ? {
            ...session,
            contents: session.contents.map((content) =>
              content.contentFormIndex === action.payload.contentFormIndex
                ? {
                  ...content,
                  quizzes: content.quizzes.map((quiz) =>
                    quiz.quizFormIndex === action.payload.quizFormIndex
                      ? { ...quiz, ...action.payload.updatedData }
                      : quiz
                  ),
                }
                : content
            ),
          }
          : session
      );

    case "DELETE_QUIZ":
      return state.map((session) =>
        session.sessionFormIndex === action.payload.sessionFormIndex
          ? {
            ...session,
            contents: session.contents?.map((content) =>
              content.contentFormIndex === action.payload.contentFormIndex
                ? {
                  ...content,
                  quizzes: content.quizzes
                    ?.filter((quiz) => quiz.quizId !== action.payload.quizId)
                    .map((quiz, index) => ({
                      ...quiz,
                      quizFormIndex: index + 1,
                    })) || [],
                }
                : content
            ) || [],
          }
          : session
      );

    default:
      return state;
  }
};
