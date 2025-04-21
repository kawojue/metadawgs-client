export interface Quest {
  id: number;
  point: number;
  todo: string;
  app_name: string;
  link: string;
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
  displayName: string;
  username: string;
  tasks: number;
  points: number;
  rank: number;
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
