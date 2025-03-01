interface UserEntity {
    id: number;
    username: string;
    display_name: string;
    avatar: string | null;
    banner: string | null;
    wallpaper: string;
    gradient: string[];
    roles: UserRoles[];
    staff: StaffRoles | null;
    premium: PremiumRoles | null;
}

type StaffRoles = 'MASTER' | 'ADMIN' | 'MODERATOR';
type PremiumRoles = 'DIAMOND' | 'GOLD' | 'SILVER';
type UserRoles = 'MEMBER' & StaffRoles & PremiumRoles;
