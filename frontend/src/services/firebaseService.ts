import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth } from "firebase/auth";

const functions = getFunctions();
const auth = getAuth();

interface UserData {
  email: string;
  password: string;
  displayName: string;
}

interface UpdateUserData {
  uid: string;
  updateData: Record<string, unknown>;
}

interface VideoData {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  userId: string;
}

interface CommentData {
  videoId: string;
  userId: string;
  content: string;
}

interface PaginationParams {
  page: number;
  limit: number;
  filters?: Record<string, unknown>;
}

export const firebaseService = {
  // Autenticación
  createUser: async (userData: UserData) => {
    const createUserFunction = httpsCallable(functions, "createUser");
    return await createUserFunction(userData);
  },

  loginUser: async (email: string, password: string) => {
    const loginFunction = httpsCallable(functions, "loginUser");
    return await loginFunction({ email, password });
  },

  resetPassword: async (email: string) => {
    const resetPasswordFunction = httpsCallable(functions, "resetPassword");
    return await resetPasswordFunction({ email });
  },

  // Usuario
  getUserData: async (uid: string) => {
    const getUserDataFunction = httpsCallable(functions, "getUserData");
    return await getUserDataFunction({ uid });
  },

  updateUserData: async (updateData: UpdateUserData) => {
    const updateUserDataFunction = httpsCallable(functions, "updateUserData");
    return await updateUserDataFunction(updateData);
  },

  deleteUser: async (uid: string) => {
    const deleteUserFunction = httpsCallable(functions, "deleteUser");
    return await deleteUserFunction({ uid });
  },

  // Videos
  createVideo: async (videoData: VideoData) => {
    const createVideoFunction = httpsCallable(functions, "createVideo");
    return await createVideoFunction(videoData);
  },

  getVideo: async (videoId: string) => {
    const getVideoFunction = httpsCallable(functions, "getVideo");
    return await getVideoFunction({ videoId });
  },

  getVideos: async (params: PaginationParams) => {
    const getVideosFunction = httpsCallable(functions, "getVideos");
    return await getVideosFunction(params);
  },

  updateVideo: async (videoId: string, updateData: Partial<VideoData>) => {
    const updateVideoFunction = httpsCallable(functions, "updateVideo");
    return await updateVideoFunction({ videoId, updateData });
  },

  deleteVideo: async (videoId: string) => {
    const deleteVideoFunction = httpsCallable(functions, "deleteVideo");
    return await deleteVideoFunction({ videoId });
  },

  // Comentarios
  addComment: async (commentData: CommentData) => {
    const addCommentFunction = httpsCallable(functions, "addComment");
    return await addCommentFunction(commentData);
  },

  getComments: async (videoId: string, params: PaginationParams) => {
    const getCommentsFunction = httpsCallable(functions, "getComments");
    return await getCommentsFunction({ videoId, ...params });
  },

  deleteComment: async (commentId: string) => {
    const deleteCommentFunction = httpsCallable(functions, "deleteComment");
    return await deleteCommentFunction({ commentId });
  },
};
