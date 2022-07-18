export class CreateTeamDto {
    name: string;
    description?: string;
    position?: string;
    order?: number;
    phone?: number;
    email?: string;
    facebookLink?: string;
    twitterLink?: string;
    instagramLink?: string;
    image?: string;
    slug: string;
}
