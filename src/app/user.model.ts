export interface User {
  user_id: string;
  username: string;
  picture: string;
  followers: number;
  is_verified: boolean;
  profile_pic_url: string;
  followers_count: number;
  fullname: string;
  recent_posts: any[];
}
