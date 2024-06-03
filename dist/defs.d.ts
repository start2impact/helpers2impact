interface Session {
    user: {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        ranking: number;
        pic_url: string;
        consecutive_days: 2;
        role: string;
        slug: string;
        plan_slug: string;
        student: {
            id: string;
            points: number;
        };
    };
}
export { Session };
