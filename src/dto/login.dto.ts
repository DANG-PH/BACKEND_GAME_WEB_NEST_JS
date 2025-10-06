import { Item } from '../item/item.entity';
import { DeTu } from '../detu/detu.entity';

export class LoginDto {
    username: string;
    role: string;
    vang: number;
    ngoc: number;
    sucManh: number;
    vangNapTuWeb: number;
    ngocNapTuWeb: number;
    x: number;
    y: number;
    mapHienTai: string;
    daVaoTaiKhoanLanDau: boolean;
    coDeTu: boolean;
    danhSachVatPhamWeb: number[];
    items: Item[];
    deTu: DeTu;
}