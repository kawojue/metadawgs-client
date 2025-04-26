export interface PostType {
  id: number;
  postId: string;
  point: number;
  name: string;
  description: string;
  postUrl: string;
  imageUrl: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  adminId: string;
  hasEngaged: boolean;
}

export interface ProfileType {
  eligibleToUseReferralCode: true;
  referralCode: string;
  user: {
    id: string;
    tasks: number;
    avatar: string;
    username: string;
    joinedAt: string;
    displayName: string;
  };
  rank: number;
}

export interface AdminProfileType {
  eligibleToUseReferralCode: true;
  referralCode: string;
  user: {
    id: string;
    tasks: number;
    avatar: string;
    username: string;
    joinedAt: string;
    displayName: string;
  };
}

export interface LeaderboardType {
  userId: string;
  username: string;
  points: number;
  messages: number;
  reactions: number;
  invites: number;
  tasks: number; // not sure about this thou
  rank: number; // not sure about this thou
}

export interface MetaType {
  size: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalPages: number;
  currentPage: number;
  offset: number;
  totalItems: number;
  nextPage: string | null;
  previousPage: string | null;
}

export interface QuestType {
  id: number;
  point: number;
  todo: string;
  app_name: string;
  link: string;
}

export interface UserType {
  id: number;
  avatar: string;
  username: string;
  walletAddress: string | null;
  tasks: number;
  banned: boolean;
  displayName: string;
  providerId: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  totalPoints: number;
}

export interface EntryType {
  id: number;
  postId: string;
  postUrl: string;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  pointId: string;
  user: {
    username: string;
  };
  point: {
    value: string;
  };
}

export interface Quest {
  id: number;
  postId: string;
  point: number;
  name: string;
  description: string;
  postUrl: string;
  imageUrl: string;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
  adminId: string;
  participationCount: number;
}
