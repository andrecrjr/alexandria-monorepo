import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCollectionDto, UpdateCollectionDto } from './collection.dto';
import { JwtDTO } from 'src/auth/jwt.dto';
import { CollectionDTO } from './collection';

@Injectable()
export class CollectionService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUserWithContent(user: JwtDTO, data: CreateCollectionDto) {
    const collectionUserData = await this.prismaService.collection.create({
      data: {
        ...data,
        profileId: user.sub,
      },
    });
    return collectionUserData;
  }

  async getCollectionByUser(user: JwtDTO): Promise<CollectionDTO[]> {
    const userCollection = await this.prismaService.collection.findMany({
      where: { profileId: user.sub },
      include: {
        content: {
          include: {
            contentType: true,
            createdBy: true,
          },
        },
      },
    });
    return userCollection;
  }

  async updateCollectionContentAndUser(
    user: JwtDTO,
    data: UpdateCollectionDto,
  ) {
    return await this.prismaService.collection.update({
      where: {
        contentId_profileId: {
          profileId: user.sub,
          contentId: data.contentId,
        },
      },
      data: {
        ...data,
      },
    });
  }

  async searchInsideCollectionByContentName(
    partialContent: string,
    user: JwtDTO,
  ): Promise<CollectionDTO[]> {
    const data = await this.prismaService.collection.findMany({
      where: {
        profileId: user.sub,
        content: {
          title: {
            contains: partialContent,
            mode: 'insensitive',
          },
        },
      },
      include: {
        content: true,
      },
    });

    return data;
  }

  async searchInsideCollectionBySynonim(
    partialContent: string,
    contentType: string,
    user: JwtDTO,
  ): Promise<CollectionDTO[]> {
    console.log(partialContent);
    const data = await this.prismaService.collection.findMany({
      where: {
        profileId: user.sub,
        content: {
          synonyms: {
            has: partialContent,
          },
          contentType: {
            title: {
              contains: contentType,
              mode: 'insensitive',
            },
          },
        },
      },
      include: {
        content: true,
      },
    });

    return data;
  }
}
