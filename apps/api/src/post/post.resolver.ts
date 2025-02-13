import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostEntity } from './entities/post.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => PostEntity)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [PostEntity], { name: 'posts' })
  findAll(@Context() context) {
    const user = context.req.user;
    console.log({ user });

    return this.postService.findAll();
  }
}
