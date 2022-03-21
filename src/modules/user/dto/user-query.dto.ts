import { PaginationQueryDto } from "src/modules/common/dto/pagination-query.dto";

export class UserQueryDto extends PaginationQueryDto {
    role?: string;
}