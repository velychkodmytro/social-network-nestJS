import { Module } from '@nestjs/common';

import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Followers } from '../../db/entities/Followers/followers';
import { User } from '../../db/entities/Users/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Followers]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
