import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCollectionDto, UpdateCollectionDto } from './collection.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtDTO } from 'src/auth/jwt.dto';

@Injectable()
@ApiTags('User Collection')
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

  async getCollectionByUser(user: JwtDTO) {
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
  ) {
    console.log(partialContent);
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
    statusTrack: string,
    user: JwtDTO,
  ) {
    const data = await this.prismaService.collection.findMany({
      where: {
        profileId: user.sub,
        content: {
          synonyms: {
            has: partialContent,
          },
          contentType: {
            statusTracker: {
              statusHistory: {
                has: statusTrack || '',
              },
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
