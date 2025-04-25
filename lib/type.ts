export interface PostType {
  id: number;
  title: string;
  points: number;
  url: string;
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
  isBanned: boolean;
}

export interface EntryType {
  id: number;
}

export interface Quest {
  id: number;
}
