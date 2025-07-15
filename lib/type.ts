/* eslint-disable @typescript-eslint/no-empty-object-type */
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

    special: boolean;
    hidden: boolean;
    duration: null;

    hasVerified: boolean;
    buttons: PostBtnType[];
}

export interface Collabs {
    user: { username: string };
    otherUrl: string;
    telegramHandle: string;
    answer: string;
}

export type PostBtnType = "View" | "Claim" | "Verify Code" | "Done" | "Join";

export interface ProfileType {
    creatorClubVerification:
        | "NOT_APPLIED"
        | "APPROVED"
        | "PENDING"
        | "REJECTED";
    referralCode: string;
    hasLinkedTelegram: false;
    airdropTokens: number | null;
    airdropStatus: boolean;
    referrals: number;
    user: {
        id: string;
        tasks: number;
        avatar: string;
        username: string;
        joinedAt: string;
        displayName: string;
        verified: boolean;
        walletAddress: string | null;
        walletApproved: boolean;
    };
    rank: number;
    overallPoints: number;
}

export interface AdminProfileType {
    id: string;
    username: string;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface TelegramLeaderboardType {
    userId: string;
    username: string;
    points: number;
    messages: number;
    reactions: number;
    invites: number;
    avatar: string;
}

export interface OverallLeaderboardType {
    userId: string;
    displayName: string;
    username: string;
    tasks: number;
    points: number;
    rank: number;
    avatar: string;
    verified: boolean;
    referralCount: number;
}

export interface GrindersLeaderboardType {
    userId: string;
    displayName: string;
    username: string;
    tasks: number;
    points: number;
    rank: number;
    avatar: string;
    verified: boolean;
}

export interface CreatorsLeaderboardType {
    userId: string;
    displayName: string;
    username: string;
    tasks: number;
    points: number;
    rank: number;
    avatar: string;
    verified: boolean;
}

export interface MetaType {
    size: number;
    hasNext: boolean;
    hasPrev: boolean;
    totalPages: number;
    currentPage: number;
    offset: number;
    totalItems: number;
    nextPage: number | null;
    previousPage: number | null;
}

export interface QuestType {
    id: number;
    point: number;
    todo: string;
    app_name: string;
    link: string;
    inApp: boolean;
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
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    adminId: string;
    participationCount: number;
    code: string;
    special: boolean;
    hidden: boolean;
    duration: number;
}

export interface PoolType {
    title: string;
    description: string;
    icon: string;
    currency: string;
    stakes: string;
    stakesEarned: string;
    stakesIcon: string;
    details: {
        label: string;
        value: string;
    }[];
}

export type LeaderboardType = "overall" | "grinders" | "telegram" | "creators";

export type Approval = {
    id: string;
    avatar: string;
    username: string;
    approved: boolean;
    verified: boolean;
    walletApproved: boolean;
    tweetsCount: number;
    followersCount: number;
    walletAddress: string;
    telegramHandle: null;
    tasks: number;
    banned: boolean;
    lastAppSubmittedAt: string;
    displayName: string;
    xAccessToken: string;
    xRefreshToken: string;
    providerId: string;
    deletedAt: null;
    updatedAt: string;
    createdAt: string;
    lastWalletAddressChangeAt: string;
    applicationSubmission: {
        id: string;
        answer1: string;
        answer2: string;
        deletedAt: null;
        createdAt: string;
        updatedAt: string;
        userId: string;
    };
};

export type UserStats = {
    postsCount: number;
    engagements: {
        likes: number;
        impressions: number;
        reposts: number;
        total: number;
    };
    bonesEarned: number;
    mindShareEngagements: number;
    superPoints: number;
};

export type MindShareBtnType = "View" | "Claim" | "Report";

export type MindShareType = {
    id: string;
    postId: string;
    postUrl: string;
    superb: boolean;
    processed: boolean;
    finalized: boolean;
    likes: number;
    impressions: number;
    reposts: number;
    score: number;
    public: boolean;
    deletedAt: null;
    createdAt: string;
    updatedAt: string;
    userId: string;
    pointId: string;
    hasEngaged: boolean;
    special: boolean;
    buttons: MindShareBtnType[];

    platform: "TikTok" | "Youtube" | "Tweet";
    bones: number;
    username: string;
};

export type AdminMindShareType = {
    id: string;
    postId: null;
    postUrl: string;
    superb: boolean;
    processed: boolean;
    finalized: boolean;
    special: boolean;
    platform: string;
    likes: number;
    impressions: number;
    reposts: number;
    score: number;
    public: boolean;
    deletedAt: null;
    createdAt: string;
    updatedAt: string;
    userId: string;
    pointId: null;
    user: {
        username: string;
    };

    //more bones
    bones?: string;
};

type ServerErrorResponse = {
    message: string;
    statusCode: number;
    success: false;
};

type ServerSuccessResponse<T = {}> = {
    message: string;
    success: true;
    data: T;
};

type ServerResponse<T = {}> = ServerErrorResponse | ServerSuccessResponse<T>;

export type IDawghouse = {
    rank: number;
    id: string;
    name: string;
    identifier: string;
    creator: {
        id: string;
        avatar: string;
        username: string;
        displayName: string;
    };
    createdAt: Date;
    totalParticipants: number;
};

type IDawghouses = Array<IDawghouse>;

export type DawghousesResponse = ServerResponse<{
    data: IDawghouses;
    meta: {
        size: number;
        hasNext: boolean;
        hasPrev: boolean;
        totalPages: number;
        currentPage: number;
        offset: number;
        totalItems: number;
        nextPage: number;
        previousPage: number;
    };
}>;

type CreateDawghouse = {
    id: string;
    name: string;
    identifier: string;
    creator: {
        id: string;
        avatar: string;
        username: string;
        displayName: string;
    };
    participantCount: number;
    maxMembers: number;
    createdAt: Date;
};

export type CreateDawghouseResponse = ServerResponse<CreateDawghouse>;

export type TournamentDuration = {
    descriptive: string;
    daysRemaining: number;
    totalDays: number;
    elapsed: number;
    remaining: number;
    start: Date;
    end: Date;
};

export type DawghouseMetrics = {
    type: "dawghouse";
    tournamentDuration: TournamentDuration;
    bonesReward: number;
    totalReferrals: number;
    referralsGoal: number;
    totalEngagements: number;
    engagementsGoal: number;
    totalBones: number;
    bonesGoal: number;
    totalTwitterPosts: number;
    totalVideos: number;
    totalParticipants: number;
    dawghouseRank: number;
    dawghouse: {
        id: string;
        name: string;
        identifier: string;
    };
};

export type IndividualMetrics = {
    type: "individual";
    tournamentDuration: TournamentDuration;
    bonesReward: number;
    postEntries: number;
    engagements: number;
    superBones: number;
    goals: {
        referrals: number;
        bones: number;
        engagements: number;
    };
};

export type DawgMetrics = DawghouseMetrics | IndividualMetrics;

export type DawgMetricsResponse = ServerResponse<DawgMetrics>;

type IJoinDawghouse = {
    id: string;
    name: string;
    creator: {
        id: string;
        username: string;
        displayName: string;
    };
    identifier: string;
    maxMembers: number;
    participantCount: number;
};

export type IJoinDawghouseResponse = ServerResponse<IJoinDawghouse>;
