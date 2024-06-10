export interface Post {
    id: number;
    user: {
        id: number;
        username: string;
        profilePic: any;
    };
    content: string;
    mediaUrl: string;
    caption: string;
    timeAgo: string;
    likes: number;
}
