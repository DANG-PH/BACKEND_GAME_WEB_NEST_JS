import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { UserService } from '../user/user.service';
import { Item } from './item.entity';

@Controller('api/items')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly userService: UserService,
  ) {}

  // Lấy toàn bộ item của 1 user
  @Get('user/:username')
  async getItemsByUser(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new HttpException('User không tồn tại!', HttpStatus.BAD_REQUEST);
    }
    return await this.itemService.getItemsByUser(user);
  }

  // Thêm item cho user
  @Post('add/:username')
  async addItem(@Param('username') username: string, @Body() item: Item) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new HttpException('User không tồn tại!', HttpStatus.BAD_REQUEST);
    }
    item.user = user;
    return await this.itemService.saveItem(item);
  }

  // Cập nhật item
  @Put(':id')
  async updateItem(@Param('id') id: number, @Body() itemUpdate: Item) {
    const item = await this.itemService.getItem(id);
    if (!item) {
      throw new HttpException('Item không tồn tại!', HttpStatus.NOT_FOUND);
    }

    item.ten = itemUpdate.ten;
    item.loai = itemUpdate.loai;
    item.moTa = itemUpdate.moTa;
    item.soLuong = itemUpdate.soLuong;
    item.viTri = itemUpdate.viTri;
    item.chiso = itemUpdate.chiso;

    return await this.itemService.saveItem(item);
  }

  // Xóa item
  @Delete(':id')
  async deleteItem(@Param('id') id: number) {
    await this.itemService.deleteItem(id);
    return { message: 'Xóa item thành công!' };
  }

  // Thêm nhiều item (replace toàn bộ list)
  @Post('add-multiple/:username')
  async addItems(@Param('username') username: string, @Body() body: { items: any[] }) {
    const items = body.items;
    if (!items || !Array.isArray(items)) {
      throw new HttpException('Danh sách items không hợp lệ', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new HttpException('User không tồn tại!', HttpStatus.BAD_REQUEST);
    }

    await this.itemService.deleteByUser(user);

    const itemsToSave = items.map(item => {
      // Luôn stringify chiso
      let chisoString = '[]'; // mặc định là mảng rỗng
      if (item.chiso) {
        try {
          if (typeof item.chiso === 'string') {
            // nếu client đã gửi string JSON
            JSON.parse(item.chiso); // thử parse để chắc chắn hợp lệ
            chisoString = item.chiso;
          } else {
            // nếu client gửi object/array
            chisoString = JSON.stringify(item.chiso);
          }
        } catch(e) {
          chisoString = '[]';
        }
      }

      return this.itemService.create({
        maItem: item.maItem || '',
        ten: item.ten || '',
        loai: item.loai || '',
        moTa: item.moTa || '',
        soLuong: item.soLuong || 0,
        hanhTinh: item.hanhTinh || '',
        setKichHoat: item.setKichHoat || '',
        soSaoPhaLe: item.soSaoPhaLe || 0,
        soSaoPhaLeCuongHoa: item.soSaoPhaLeCuongHoa || 0,
        soCap: item.soCap || 0,
        hanSuDung: item.hanSuDung || 0,
        sucManhYeuCau: item.sucManhYeuCau?.toString() || '0', // long → string
        linkTexture: item.linkTexture || '',
        viTri: item.viTri || '',
        chiso: chisoString, // LƯU LUÔN LÀ STRING
        user: user,
      });
    });

    try {
      return await this.itemService.saveAll(itemsToSave);
    } catch (e) {
      console.error('Lỗi save items:', e);
      throw new HttpException(`Lỗi khi lưu item: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}