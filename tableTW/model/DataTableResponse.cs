using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AulacEmsWeb.model
{
    public class layDSTrungTam
    {
        public string matrungtam { get; set; }
        public string tentrungtam { get; set; }
    }
    public class layLuuVetDangNhap
    {
        public string account { get; set; }
        public string wanip { get; set; }
        public string lanip { get; set; }
    }
    public class layDSKhoa
    {
        public string Makhoa { get; set; }
        public string MakhoaQL { get; set; }
        public string tenkhoa { get; set; }

        public string slBenhNhan { get; set; }

        public string slGiuong { get; set; }
        public string slGiuongTT { get; set; }
    }

    public class layDSGiuong
    {
        public string makhoa { get; set; }

        public string SoGiuong { get; set; }

        public string slBenhNhan { get; set; }

        public string slbntt { get; set; }

        public string tenkhoa { get; set; }
    }

    public class LayDSBNtaiKhoa
    {
        public string mabn { get; set; }
        public string slmua { get; set; }
        public string Hoten { get; set; }
        public string SoGiuong { get; set; }
        public string dienthoai { get; set; }
        public string ngaysinh { get; set; }
        public string tenkhoa { get; set; }
        public string tongtienthuoc { get; set; }
        public string benhvaovien { get; set; }
    }
    public class nhanvien
    {
        public string manv { get; set; }
        public string hoten { get; set; }
    }
    public class baocao_hoanthanh_theongay
    {
        public string soluong { get; set; }
        public string ngay { get; set; }
    }
    public class congviec_hoanthanh_ngayht
    {
        public string manv { get; set; }
        public string hotennv { get; set; }
        public string soluong { get; set; }
        public string ngay { get; set; }
        public string mausac { get; set; }
    }
    public class nhanvien_mausac
    {
        public string manv { get; set; }
        public string hoten { get; set; }
        public string mausac { get; set; }
    }
    public class baocao_nhanvien
    {
        public string manv { get; set; }
        public string hotennv { get; set; }

        public string socongviec { get; set; }
        public string trungbinhphut { get; set; }
        public string caonhatphut { get; set; }
        public string lydo { get; set; }
    }
    public class xldanhgia
    {
        public string danhgia { get; set; }
        public int sodiem { get; set; }
    }
    public class congvieccho
    {
        public string id { get; set; }

        public string congviec { get; set; }

        public string mota { get; set; }

        public string makhoayeucau { get; set; }

        public string tenkhoayeucau { get; set; }
        public string makhoatao { get; set; }

        public string tenkhoatao { get; set; }
        public string ngaygiotao { get; set; }
        public string ngaygionhan { get; set; }

        public string ngaygiohoanthanh { get; set; }

        public string manv { get; set; }
        public string danhgia { get; set; }
        public string ketqua { get; set; }
        public string daxuly { get; set; }
        public string hotennv { get; set; }
        public List<nhanvien> listnhanvien { get; set; }
        public string nhanvienhotro { get; set; }

        public string Qadmin { get; set; }

        public List<xldanhgia> listxldanhgia { get; set; }

    }
    public class congviec_ketqua
    {
        public string ketqua { get; set; }
    }
    public class Benhnhan_dto
    {
        public string mabn { get; set; }
        public string hoten { get; set; }
        public string gioitinh { get; set; }
        public string ngaysinh { get; set; }
        public string madantoc { get; set; }
        public string maqg { get; set; }
        public string matinh { get; set; }
        public string mahuyen { get; set; }
        public string maphuongxa { get; set; }
        public string diachi { get; set; }
        public string baotin { get; set; }
        public string dienthoai { get; set; }
        public string manghenghiep { get; set; }
        public string sothe { get; set; }
        public string tungay { get; set; }
        public string denngay { get; set; }
        public string madkkcb { get; set; }
        public string ngayvv { get; set; }
        public string mabenh { get; set; }
    }
    public class Benhnhan_timkiem
    {
        public string mabn { get; set; }
    }
}