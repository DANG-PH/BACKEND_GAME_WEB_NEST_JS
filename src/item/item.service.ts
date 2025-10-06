import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getItemsByUser(user: User): Promise<any[]> {
    console.log('Gọi getItemsByUser cho user:', user.username);

    // user thật từ DB
    const dbUser = await this.userRepository.findOne({ where: { username: user.username } });
    if (!dbUser) {
      console.log('Không tìm thấy user trong DB');
      return [];
    }

    const items = await this.itemRepository.find({
      where: { user: { id: dbUser.id } },
    });
    console.log('Items lấy bằng id:', items);

    const parsedItems = items.map(item => {
      let chisoParsed = [];
      try {
        chisoParsed = item.chiso ? JSON.parse(item.chiso) : [];
      } catch (e) {
        chisoParsed = [];
      }
      return {
        ...item,
        chiso: chisoParsed,
      };
    });

    console.log('Items trả về:', parsedItems);
    return parsedItems;
  }


  async getItemsByUserId(userId: number): Promise<Item[]> {
    return this.itemRepository.find({ where: { user: { id: userId } } });
  }

  async getItem(id: number): Promise<Item | null> {
    return this.itemRepository.findOne({ where: { id } });
  }

  async saveItem(item: Item): Promise<Item> {
    return this.itemRepository.save(item);
  }

  async saveAll(items: Item[]): Promise<Item[]> {
    return this.itemRepository.save(items);
  }

  async deleteItem(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }

  async deleteByUser(user: User): Promise<void> {
    await this.itemRepository.delete({ user });
  }

   // Tạo entity từ object thuần
  create(data: Partial<Item>): Item {
    return this.itemRepository.create(data);
  }
}
