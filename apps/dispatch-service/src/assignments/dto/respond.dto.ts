import { IsIn } from 'class-validator';

export class RespondDto {
    @IsIn(['ACCEPT', 'REJECT'])
    decision: 'ACCEPT' | 'REJECT';
}