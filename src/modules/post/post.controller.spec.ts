import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
describe('PostController', () => {
  let controller: PostController;

  const mockPostService = {
    getAllPosts: jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    }),
    getSinglePost: jest.fn().mockImplementation((id) => {
      return Promise.resolve({
        id,
        title: 'title',
        text: 'text',
        ownerId: 'ownerId',
      });
    }),
    deletePost: jest.fn().mockImplementation((id) => {
      return { id, result: 'deleted' };
    }),
    updatePost: jest.fn().mockImplementation((id, dto) => {
      return {
        title: 'title',
        text: 'text',
        id,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    })
      .overrideProvider(PostService)
      .useValue(mockPostService)
      .compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all posts', async () => {
    expect(await controller.getAllPosts()).toBeInstanceOf(Array);

    expect(mockPostService.getAllPosts).toHaveBeenCalled();
  });

  it('should return a post found by id', async () => {
    const id = 'id';

    expect(await controller.getSinglePost(id)).toEqual({
      id,
      title: expect.any(String),
      text: expect.any(String),
      ownerId: expect.any(String),
    });

    expect(mockPostService.getSinglePost).toHaveBeenCalledWith(id);
  });

  it('should delete a post', async () => {
    const id = 'id';

    expect(await controller.delete(id)).toEqual({
      id: expect.any(String),
      result: expect.any(String),
    });

    expect(mockPostService.deletePost).toHaveBeenCalledWith(id);
  });

  it('should update a post', async () => {
    const dto = {
      title: 'title',
      text: 'text',
    };
    const id = 'id';

    expect(await controller.updatePostById(id, dto)).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      text: expect.any(String),
    });

    expect(mockPostService.updatePost).toHaveBeenCalledWith(id, dto);
  });
});
