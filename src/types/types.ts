interface MonthlyStats {
  month: string;
  newUsers: number;
  totalUsers: number;
  newSubscriptions: number;
  totalSubscriptions: number;
  monthlyEarning: number;
}

export interface IAnalatycs {
  year: number;
  totalUsers: number;
  totalBookings: number;
  totalEarning: number;
  totalSubscriptions: number;
  monthlyData: MonthlyStats[];
}


export interface IUserProfile {
  _id?: string;
  firstName?: string;
  lastName?: string;
  date_of_birth?: string;
  country?: string;
  skills?: string[];
  year_of_exprience?: string;
  level_of_experience?: string;
  image?: string;
  cover_image?: string;
  username?: string;
}

export interface IAuthUser {
  _id: string;
  profile: IUserProfile;
  email: string;
  role: string;
  status: 'active' | 'delete';
  verified: boolean;
  auth_provider: 'local' | 'google' | 'apple';
}

export interface IUser {
  _id: string;
  name: string;
  profilePic: string | null;
  isVerifiedHost: boolean;
  email: string;
  contact: string;
  address: string;
  connectedAccountId: string | null;
  stripeConnectedLink: string | null;
  dateOfBirth: string; // ISO string (e.g., "2003-09-11T18:00:00.000Z")
  images: string[];
  status: "active" | "inactive" | string;
  role: "guest" | "host" | "admin" | string;
  verified: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  airlineVerification: string | null;
}

export interface IPagination {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

export interface IFacility {
  _id: string;
  name: string;
  logo: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}


export interface IPackage {
  _id: string;
  title: string;
  price: number;
  billingCycle: string; // e.g. "add-on"
  description: string;
  features: string[];
  active: boolean;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  __v: number;
}

export interface IReview {
  _id: string;
  hotel: string;
  content: string;
  user: {
    _id: string;
    name: string;
    email: string;
    id: string;
  };
  rating: number;
  isVisible: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
}

export interface ITag {
  _id: string;
  name: string;
  category?: string | { _id: string; name: string };
  short_code?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface ICoupon {
  _id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IClubManager {
  _id: string;
  email: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    username?: string;
  };
}

export interface IClub {
  _id: string;
  name: string;
  email: string;
  description?: string;
  website?: string;
  address?: string;
  club_creator?: string;
  stablished_date?: string;
  country?: string;
  post_code?: string;
  club_specilaity?: string[];
  allow_waiting_list?: boolean;
  enable_public_club?: boolean;
  allow_class_cancelation?: boolean;
  club_members?: number;
  total_members?: number;
  group_role?: string;
  image?: string;
  cover_image?: string;
  managers?: IClubManager[];
  premium_feature?: {
    community_and_sharing?: boolean;
    booking_system?: boolean;
  };
  payment?: {
    currency_of_payment?: string;
    in_person_payment?: boolean;
  };
  pre_class_cancelation?: {
    period?: number;
    period_type?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface IClass {
  _id: string;
  club?: string;
  creator?: string;
  class_status?: string;
  class_name?: string;
  date_of_class?: string;
  start_time?: string;
  duration?: string;
  const_per_ticket?: number;
  max_number_of_attendees?: number;
  remaining_space?: number;
  booking_status?: string;
  delete_class?: boolean;
}

export interface IClubClassesData {
  userCredit?: number;
  today?: IClass[];
  thisWeek?: IClass[];
  nextWeek?: IClass[];
  afterNextWeek?: IClass[];
}

export interface ISetting {
  description: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SettingPayload = Pick<ISetting, 'description'>;

export interface INotification {
  _id: string;
  title: string;
  refId: string;
  path: string;
  message: string;
  seen: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  receiver: string;
}

