using AulacEmsWeb.model;
using Microsoft.Office.Interop.Excel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace tableTW
{
    public partial class indexQLCV : System.Web.UI.Page
    {
        static string strConnString = "";
        static List<nhanvien> listnv= new List<nhanvien>();
        static List<nhanvien> listnvht = new List<nhanvien>();
        static List<xldanhgia> listxldanhgia = new List<xldanhgia>();
        static string username = "";
        static string hotentc = "";
        static string manvtc = "";
        static string Qadmintc = "";
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!IsPostBack)
            {
               
                if (Session["username"] != null)
                {
                     username = Session["username"].ToString();
                    hotentc = Session["hoten"].ToString();
                    manvtc = Session["manv"].ToString();
                    Qadmintc = Session["Qadmin"].ToString();
                    congviec_tennv_bt.Text = hotentc;
                    if (Qadmintc.Equals("False"))
                    {
                        themcongviec_btnluu.Enabled = false;
                        themnhanvien_btnluu.Enabled = false;
                    }
                }
                else
                {
                    Response.Redirect("login.aspx");
                }
                string[] lines = System.IO.File.ReadAllLines(Server.MapPath("~") + "./file.txt");
                if (lines.Length >= 3)
                {
                    strConnString = "Data Source=" + lines[0] + ";Initial Catalog=" + lines[1] + ";User Id=" + lines[2] + ";Password=" + lines[3] + ";Connection Timeout=50;".Replace(@"\\", @"\");
                    //ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString = strConnString;
                }
                else
                {
                    string script = "alert(\"Lỗi kết nối cơ sở dữ liệu hãy thiết lập kết nối CSDL!\");";
                    ScriptManager.RegisterStartupScript(this, GetType(),
                                          "ServerControlScript", script, true);
                }
                //Assign the value to static variable
                load_danhgia();
                load_dsnhanvienkhoa();
                DateTime localDate = DateTime.Now;
                themcongviec_txtngayyeucau.Text = localDate.ToString("yyyy-MM-dd");
                themcongviec_txtgioyeucau.Text = "17:00";
            }
           
        }
        protected void logout_Click(object sender, EventArgs e)
        {
            Session["manv"] = null;
            Session["hoten"] = null;
            Session["password"] = null;
            Session["username"] = null;
            Qadmintc = Session["Qadmin"].ToString();
            Response.Redirect("login.aspx");
        }
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        protected void load_dsnhanvienkhoa()
        {
            SqlConnection con = null;
            con = new SqlConnection(strConnString);
            SqlCommand comdmkhoa = null;
            comdmkhoa = new SqlCommand("select 'CPC000' as manv,N' Chưa phân công' as hoten union all select manv,hoten from DMNhanVien_QLCV where huy=0 and makhoals = '008' order by hoten", con);
            SqlDataAdapter da = new SqlDataAdapter(comdmkhoa);
            DataSet ds = new DataSet();
            da.Fill(ds);
            themcongviec_dlphancongcongviec.DataSource = ds;
            themcongviec_dlphancongcongviec.DataTextField = "hoten";
            themcongviec_dlphancongcongviec.DataValueField = "manv";
            themcongviec_dlphancongcongviec.DataBind();
            themcongviec_dlnhanvienhotro.DataSource = ds;
            themcongviec_dlnhanvienhotro.DataTextField = "hoten";
            themcongviec_dlnhanvienhotro.DataValueField = "manv";
            themcongviec_dlnhanvienhotro.DataBind();
            themnhanvien_dlnhanvien.DataSource = ds;
            themnhanvien_dlnhanvien.DataTextField = "hoten";
            themnhanvien_dlnhanvien.DataValueField = "manv";
            themnhanvien_dlnhanvien.DataBind();
            con.Open();
            SqlDataReader reader = comdmkhoa.ExecuteReader();
            if (reader == null)
            {
                con.Close();
            }
            else
            {
                while (reader.Read())
                    listnv.Add(new nhanvien() { manv = reader["manv"].ToString(), hoten = reader["hoten"].ToString() });
            }
        }
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        protected void load_danhgia()
        {
            SqlConnection con = null;
            con = new SqlConnection(strConnString);
            SqlCommand comdmkhoa = null;
            comdmkhoa = new SqlCommand("select '0' as sodiem,N' Chưa đánh giá' as danhgia union all select sodiem,danhgia from danhgia order by sodiem", con);
            con.Open();
            SqlDataReader reader = comdmkhoa.ExecuteReader();
            if (reader == null)
            {
                con.Close();
            }
            else
            {
                while (reader.Read())
                    listxldanhgia.Add(new xldanhgia() { sodiem =int.Parse(reader["sodiem"].ToString()), danhgia = reader["danhgia"].ToString() });
            }
        }
        //Nhập lại
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        protected void xoatxt_Click(object sender, EventArgs e)
        {
            themcongviec_txtkhoayccongviec.Text = "";
            themcongviec_txtmotacongviec.Text = "";
            themcongviec_txttencongviec.Text = "";
            themcongviec_txtnhanvienhotro.Text = "";
            //themcongviec_txtthoigianyeucau.Text = "";
            themnhanvien_txtmanhanvien.Text = "";
            themnhanvien_txtmatkhau.Text = "";
            themnhanvien_txttennhanvien.Text = "";
            themnhanvien_checkQadmin.Checked = false;
            DateTime localDate = DateTime.Now;
            themcongviec_txtngayyeucau.Text = localDate.ToString("yyyy-MM-dd");
            themcongviec_txtgioyeucau.Text = "17:00";
            themcongviec_dlphancongcongviec.SelectedIndex = 0;
            themnhanvien_dlnhanvien.SelectedIndex = 0;
        }
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        protected void themcongviec_dlphancongcongviec_Change(Object sender, EventArgs e)
        {
           
            hdfphancongcongviec.Value = themcongviec_dlphancongcongviec.SelectedValue;


        }
        //Dropdown list thêm nhân viên nhân viên change
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        protected void themnhanvien_dlnhanvien_Change(Object sender, EventArgs e)
        {
            string manv = themnhanvien_dlnhanvien.SelectedValue;
            try
            {
                //string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_Get_NhanVien", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter manvsql = new SqlParameter("@manv", SqlDbType.NVarChar, 50);
                        manvsql.Direction = ParameterDirection.Input;
                        manvsql.Value = manv;
                        cmd.Parameters.Add(manvsql);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            string script = "alert(\"Khong tim thay nv nay!\");";
                            ScriptManager.RegisterStartupScript(this, GetType(),
                                                  "ServerControlScript", script, true);
                        }
                        else
                        {
                            while (reader.Read())
                            {
                                themnhanvien_txtmanhanvien.Text = manv;
                                themnhanvien_txttennhanvien.Text = reader.GetString(5);
                                //themnhanvien_txttennhanvien.Text = reader.GetString(5);
                                themnhanvien_txtmatkhau.Text = reader.GetString(3);
                                if (reader.GetBoolean(6) == true)
                                {
                                    themnhanvien_checkQadmin.Checked = true;
                                }
                                else
                                {
                                    themnhanvien_checkQadmin.Checked = false;
                                }
                            }

                        }
                    }
                }
            }
            catch (Exception)
            {
                string script = "alert(\"Lỗi kết nối!\");";
                ScriptManager.RegisterStartupScript(this, GetType(),
                                      "ServerControlScript", script, true);
            }
        }
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        protected void themcongviec_dlnhanvienhotro_Change(Object sender, EventArgs e)
        {
            if (themcongviec_txtnhanvienhotro.Text.Contains(themcongviec_dlnhanvienhotro.SelectedItem.Text))
            {
                for(int i =0; i<listnvht.Count;i++)
                {
                    if(listnvht[i].manv== themcongviec_dlnhanvienhotro.SelectedItem.Value)
                    {
                        listnvht.Remove(listnvht[i]);
                    }
                    
                }
                loadthemcongviec_txtnhanvienhotro(listnvht);
            }
            else
            {
                if (themcongviec_txtnhanvienhotro.Text != "")
                {
                    listnvht.Add(new nhanvien() { manv = themcongviec_dlnhanvienhotro.SelectedItem.Value, hoten = themcongviec_dlnhanvienhotro.SelectedItem.Text });
                    themcongviec_txtnhanvienhotro.Text = themcongviec_txtnhanvienhotro.Text + "," + themcongviec_dlnhanvienhotro.SelectedItem.Text;
                }
                else
                {
                    listnvht.Add(new nhanvien() { manv = themcongviec_dlnhanvienhotro.SelectedItem.Value, hoten = themcongviec_dlnhanvienhotro.SelectedItem.Text });
                    themcongviec_txtnhanvienhotro.Text = themcongviec_dlnhanvienhotro.SelectedItem.Text;
                }
            }
            themcongviec_dlnhanvienhotro.SelectedValue = "CPC000";
        }
public void loadthemcongviec_txtnhanvienhotro(List<nhanvien> list)
        {
            themcongviec_txtnhanvienhotro.Text = "";
            foreach (nhanvien nv in list)
            {
                if (themcongviec_txtnhanvienhotro.Text == "")
                {
                    themcongviec_txtnhanvienhotro.Text = nv.hoten;
                }
                else
                {
                    themcongviec_txtnhanvienhotro.Text = themcongviec_txtnhanvienhotro.Text + "," + nv.hoten;
                }
               
            }
        }
        //Thêm mới công việc
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        protected void themcongviec_btnluu_Click(object sender, EventArgs e)
        {
            if (!themcongviec_txttencongviec.Text.Equals("") || !themcongviec_txtkhoayccongviec.Text.Equals(""))
            {
                try
                {
                    //string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                    using (SqlConnection connection = new SqlConnection(strConnString))
                    {
                        using (SqlCommand cmd = new SqlCommand("WebGiuong_Add_Congviec", connection))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            SqlParameter congviec = new SqlParameter("@congviec", SqlDbType.NVarChar, 500);
                            SqlParameter mota = new SqlParameter("@mota", SqlDbType.NVarChar, 500);
                            SqlParameter makhoayeucau = new SqlParameter("@makhoayeucau", SqlDbType.NVarChar, 50);
                            SqlParameter manvtao = new SqlParameter("@manvtao", SqlDbType.NVarChar, 50);
                            SqlParameter manvphancong = new SqlParameter("@manvphancong", SqlDbType.NVarChar, 50);
                            SqlParameter hoten = new SqlParameter("@hoten", SqlDbType.NVarChar, 50);
                            SqlParameter nhanvienhotro = new SqlParameter("@nhanvienhotro", SqlDbType.NVarChar, 4000);
                            SqlParameter thoigianyeucau = new SqlParameter("@thoigianyeucau", SqlDbType.NVarChar, 50);
                            congviec.Direction = ParameterDirection.Input;
                            mota.Direction = ParameterDirection.Input;
                            makhoayeucau.Direction = ParameterDirection.Input;
                            manvtao.Direction = ParameterDirection.Input;
                            manvphancong.Direction = ParameterDirection.Input;
                            hoten.Direction = ParameterDirection.Input;
                            nhanvienhotro.Direction = ParameterDirection.Input;
                            thoigianyeucau.Direction = ParameterDirection.Input;
                            congviec.Value = themcongviec_txttencongviec.Text;
                            mota.Value = themcongviec_txtmotacongviec.Text;
                            makhoayeucau.Value = themcongviec_txtkhoayccongviec.Text;
                            manvtao.Value = "CNTT";
                            manvphancong.Value = themcongviec_dlphancongcongviec.SelectedItem.Value;
                            hoten.Value = themcongviec_dlphancongcongviec.SelectedItem.Text;
                            nhanvienhotro.Value = themcongviec_txtnhanvienhotro.Text;
                            //thoigianyeucau.Value = themcongviec_txtthoigianyeucau.Text.Replace("T"," ");
                            thoigianyeucau.Value = themcongviec_txtngayyeucau.Text + " " + themcongviec_txtgioyeucau.Text;
                            cmd.Parameters.Add(congviec);
                            cmd.Parameters.Add(mota);
                            cmd.Parameters.Add(makhoayeucau);
                            cmd.Parameters.Add(manvtao);
                            cmd.Parameters.Add(manvphancong);
                            cmd.Parameters.Add(hoten);
                            cmd.Parameters.Add(nhanvienhotro);
                            cmd.Parameters.Add(thoigianyeucau);
                            connection.Open();
                            SqlDataReader reader = cmd.ExecuteReader();
                            if (reader == null)
                            {
                                string script = "alert(\"Khong tim thay bn nay!\");";
                                ScriptManager.RegisterStartupScript(this, GetType(),
                                                      "ServerControlScript", script, true);
                            }
                            else
                            {
                                int id = 0;
                                while (reader.Read())
                                {
                                    id = reader.GetInt32(1);

                                    foreach (nhanvien nv in listnvht)
                                    {
                                        using (SqlConnection connect = new SqlConnection(strConnString))
                                        {
                                            using (SqlCommand cmd1 = new SqlCommand("WebGiuong_Add_Congviec_NhanVien", connect))
                                            {
                                                cmd1.CommandType = CommandType.StoredProcedure;
                                                SqlParameter idcongviec = new SqlParameter("@idcongviec", SqlDbType.Int);
                                                SqlParameter manv = new SqlParameter("@manv", SqlDbType.NVarChar, 50);
                                                SqlParameter hotenht = new SqlParameter("@hoten", SqlDbType.NVarChar, 500);
                                                idcongviec.Direction = ParameterDirection.Input;
                                                manv.Direction = ParameterDirection.Input;
                                                hotenht.Direction = ParameterDirection.Input;
                                                idcongviec.Value = id;
                                                manv.Value = nv.manv;
                                                hotenht.Value = nv.hoten;
                                                cmd1.Parameters.Add(idcongviec);
                                                cmd1.Parameters.Add(manv);
                                                cmd1.Parameters.Add(hotenht);
                                                connect.Open();
                                                SqlDataReader reader1 = cmd1.ExecuteReader();
                                            }
                                        }
                                    }
                                    xoatxt_Click(null, null);
                                    listnvht = new List<nhanvien>();
                                    string script = "alert(\"" + reader.GetString(0) + "!\");";
                                    ScriptManager.RegisterStartupScript(this, GetType(),
                                                      "ServerControlScript", script, true);
                                }

                            }
                        }
                    }
                }
                catch (Exception)
                {
                    string script = "alert(\"Lỗi kết nối!\");";
                    ScriptManager.RegisterStartupScript(this, GetType(),
                                          "ServerControlScript", script, true);
                }
            }
            else
            {
                // themcongviec_txtmotacongviec.Text = themcongviec_txtthoigianyeucau.Text;
                themcongviec_txtmotacongviec.Text = themcongviec_txtngayyeucau.Text + " " + themcongviec_txtgioyeucau.Text;
                string script = "alert(\"Nhập thiếu thông tin!\");";
                ScriptManager.RegisterStartupScript(this, GetType(),
                                      "ServerControlScript", script, true);

            }

        }
        //----------------------------------------------
        //Thêm mới nhân viên
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        protected void themnhanvien_btnluu_Click(object sender, EventArgs e)
        {
            if (!themnhanvien_txttennhanvien.Text.Equals("") || !themnhanvien_txtmanhanvien.Text.Equals("") || !themnhanvien_txtmatkhau.Text.Equals(""))
            {
                try
                {
                    //string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                    using (SqlConnection connection = new SqlConnection(strConnString))
                    {
                        using (SqlCommand cmd = new SqlCommand("WebGiuong_Add_NhanVien", connection))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            SqlParameter hoten = new SqlParameter("@hoten", SqlDbType.NVarChar, 500);
                            SqlParameter manv = new SqlParameter("@manv", SqlDbType.NVarChar, 500);
                            SqlParameter password = new SqlParameter("@password", SqlDbType.NVarChar, 50);
                            SqlParameter Qadmin = new SqlParameter("@Qadmin", SqlDbType.Bit);
                            hoten.Direction = ParameterDirection.Input;
                            manv.Direction = ParameterDirection.Input;
                            password.Direction = ParameterDirection.Input;
                            Qadmin.Direction = ParameterDirection.Input;
                            hoten.Value = themnhanvien_txttennhanvien.Text;
                            manv.Value = themnhanvien_txtmanhanvien.Text;
                            password.Value = themnhanvien_txtmatkhau.Text;
                            Qadmin.Value = themnhanvien_checkQadmin.Checked;
                            cmd.Parameters.Add(hoten);
                            cmd.Parameters.Add(manv);
                            cmd.Parameters.Add(password);
                            cmd.Parameters.Add(Qadmin);
                            connection.Open();
                            SqlDataReader reader = cmd.ExecuteReader();
                            if (reader == null)
                            {
                                string script = "alert(\"Khong tim thay bn nay!\");";
                                ScriptManager.RegisterStartupScript(this, GetType(),
                                                      "ServerControlScript", script, true);
                            }
                            else
                            {
                                while (reader.Read())
                                {
                                    xoatxt_Click(null, null);
                                    string script = "alert(\"" + reader.GetString(0) + "!\");";
                                    ScriptManager.RegisterStartupScript(this, GetType(),
                                                      "ServerControlScript", script, true);
                                }

                            }
                        }
                    }
                }
                catch (Exception)
                {
                    string script = "alert(\"Lỗi kết nối!\");";
                    ScriptManager.RegisterStartupScript(this, GetType(),
                                          "ServerControlScript", script, true);
                }
            }
            else
            {
                string script = "alert(\"Nhập thiếu thông tin!\");";
                ScriptManager.RegisterStartupScript(this, GetType(),
                                      "ServerControlScript", script, true);
            }

        }
        //----------------------------------------------
        //Xóa nhân viên
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        protected void themnhanvien_btnxoa_Click(object sender, EventArgs e)
        {
            if ( !themnhanvien_txtmanhanvien.Text.Equals(""))
            {
                try
                {
                    //string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                    using (SqlConnection connection = new SqlConnection(strConnString))
                    {
                        using (SqlCommand cmd = new SqlCommand("WebGiuong_Delete_NhanVien", connection))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            SqlParameter manv = new SqlParameter("@manv", SqlDbType.NVarChar, 500);
                            manv.Direction = ParameterDirection.Input;
                            manv.Value = themnhanvien_txtmanhanvien.Text;
                            cmd.Parameters.Add(manv);
                            connection.Open();
                            SqlDataReader reader = cmd.ExecuteReader();
                            if (reader == null)
                            {
                                string script = "alert(\"Khong tim thay bn nay!\");";
                                ScriptManager.RegisterStartupScript(this, GetType(),
                                                      "ServerControlScript", script, true);
                            }
                            else
                            {
                                while (reader.Read())
                                {
                                    xoatxt_Click(null, null);
                                    string script = "alert(\"" + reader.GetString(0) + "!\");";
                                    ScriptManager.RegisterStartupScript(this, GetType(),
                                                      "ServerControlScript", script, true);
                                }

                            }
                        }
                    }
                }
                catch (Exception)
                {
                    string script = "alert(\"Lỗi kết nối!\");";
                    ScriptManager.RegisterStartupScript(this, GetType(),
                                          "ServerControlScript", script, true);
                }
            }
            else
            {
                string script = "alert(\"Chưa chọn nhân viên để xóa!\");";
                ScriptManager.RegisterStartupScript(this, GetType(),
                                      "ServerControlScript", script, true);
            }

        }
        //----------------------------------------------
        //Cập nhật nhân viên
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        protected void themnhanvien_btncapnhat_Click(object sender, EventArgs e)
        {
            if (!themnhanvien_txttennhanvien.Text.Equals("") || !themnhanvien_txtmanhanvien.Text.Equals("") || !themnhanvien_txtmatkhau.Text.Equals(""))
            {
                try
                {
                    //string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                    using (SqlConnection connection = new SqlConnection(strConnString))
                    {
                        using (SqlCommand cmd = new SqlCommand("WebGiuong_Update_NhanVien", connection))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            SqlParameter hoten = new SqlParameter("@hoten", SqlDbType.NVarChar, 500);
                            SqlParameter manv = new SqlParameter("@manv", SqlDbType.NVarChar, 500);
                            SqlParameter password = new SqlParameter("@password", SqlDbType.NVarChar, 50);
                            SqlParameter Qadmin = new SqlParameter("@Qadmin", SqlDbType.Bit);
                            hoten.Direction = ParameterDirection.Input;
                            manv.Direction = ParameterDirection.Input;
                            password.Direction = ParameterDirection.Input;
                            Qadmin.Direction = ParameterDirection.Input;
                            hoten.Value = themnhanvien_txttennhanvien.Text;
                            manv.Value = themnhanvien_txtmanhanvien.Text;
                            password.Value = themnhanvien_txtmatkhau.Text;
                            Qadmin.Value = themnhanvien_checkQadmin.Checked;
                            cmd.Parameters.Add(hoten);
                            cmd.Parameters.Add(manv);
                            cmd.Parameters.Add(password);
                            cmd.Parameters.Add(Qadmin);
                            connection.Open();
                            SqlDataReader reader = cmd.ExecuteReader();
                            if (reader == null)
                            {
                                string script = "alert(\"Khong tim thay nv nay!\");";
                                ScriptManager.RegisterStartupScript(this, GetType(),
                                                      "ServerControlScript", script, true);
                            }
                            else
                            {
                                while (reader.Read())
                                {
                                    xoatxt_Click(null, null);
                                    string script = "alert(\"" + reader.GetString(0) + "!\");";
                                    ScriptManager.RegisterStartupScript(this, GetType(),
                                                      "ServerControlScript", script, true);
                                }

                            }
                        }
                    }
                }
                catch (Exception)
                {
                    string script = "alert(\"Lỗi kết nối!\");";
                    ScriptManager.RegisterStartupScript(this, GetType(),
                                          "ServerControlScript", script, true);
                }
            }
            else
            {
                string script = "alert(\"Chọn nhân viên để cập nhật, chưa nhập đủ thông tin!\");";
                ScriptManager.RegisterStartupScript(this, GetType(),
                                      "ServerControlScript", script, true);
            }

        }
        //----------------------------------------------
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxcongviecho()
        {
            try
            {
               // string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<congvieccho> dscongvieccho = new List<congvieccho>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_get_phancongcongviec", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new congvieccho() { hotennv=hotentc,manv=manvtc,Qadmin=Qadmintc,listnhanvien=listnv,id = reader["id"].ToString(), congviec = reader["congviec"].ToString(), mota = reader["mota"].ToString(), makhoayeucau = reader["makhoayeucau"].ToString(), tenkhoayeucau = reader["tenkhoayeucau"].ToString(), ngaygiotao = reader["ngaygiotao"].ToString(), ngaygionhan = reader["ngaygionhan"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxcongviecdanhan()
        {
           
            try
            {
               // string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<congvieccho> dscongvieccho = new List<congvieccho>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_get_congviec_nhanvien", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter manv = new SqlParameter("@manv", SqlDbType.NVarChar, 50);
                        manv.Direction = ParameterDirection.Input;
                        manv.Value =manvtc;
                        cmd.Parameters.Add(manv);
                        string qadmin1 = Qadmintc;
                         qadmin1 = "";
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new congvieccho() {Qadmin = Qadmintc, nhanvienhotro = reader["nhanvienhotro"].ToString(), listnhanvien = listnv, id = reader["id"].ToString(), congviec = reader["congviec"].ToString(), mota = reader["mota"].ToString(), makhoayeucau = reader["makhoayeucau"].ToString(), tenkhoayeucau = reader["tenkhoayeucau"].ToString(), ngaygiotao = reader["ngaygiotao"].ToString(), ngaygionhan = reader["ngaygionhan"].ToString(), manv = reader["manv"].ToString(), hotennv = reader["hotennv"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        //công việc đã xong
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxcongviecdaxong(string TUNGAYXONG, string DENNGAYXONG, string TIMKIEMXONG)
        {
            try
            {
                //string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<congvieccho> dscongvieccho = new List<congvieccho>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_get_congviec_daxong", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tungayxong = new SqlParameter("@tungayxong", SqlDbType.NVarChar, 50);
                        SqlParameter denngayxong = new SqlParameter("@denngayxong", SqlDbType.NVarChar, 50);
                        SqlParameter timkiemxong = new SqlParameter("@timkiem", SqlDbType.NVarChar, 500);
                        tungayxong.Direction = ParameterDirection.Input;
                        tungayxong.Value = TUNGAYXONG;
                        denngayxong.Direction = ParameterDirection.Input;
                        denngayxong.Value = DENNGAYXONG;
                        timkiemxong.Direction = ParameterDirection.Input;
                        timkiemxong.Value = TIMKIEMXONG;
                        cmd.Parameters.Add(tungayxong);
                        cmd.Parameters.Add(denngayxong);
                        cmd.Parameters.Add(timkiemxong);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new congvieccho() { danhgia = reader["danhgia"].ToString(), listxldanhgia = listxldanhgia, Qadmin = Qadmintc, hotennv = reader["hotennv"].ToString(), manv = reader["manv"].ToString(), ngaygiohoanthanh = reader["ngaygiohoanthanh"].ToString(), id = reader["id"].ToString(), congviec = reader["congviec"].ToString(), mota = reader["mota"].ToString(), makhoayeucau = reader["makhoayeucau"].ToString(), tenkhoayeucau = reader["tenkhoayeucau"].ToString(), ngaygiotao = reader["ngaygiotao"].ToString(), ngaygionhan = reader["ngaygionhan"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }


        //báo cáo công việc
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxbaocaocongviec(string tungaybaocao, string denngaybaocao, string timkiembaocao)
        {
            try
            {
               // string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<baocao_nhanvien> dscongvieccho = new List<baocao_nhanvien>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_BaoCao_congviec_nhanvien", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tungayxong = new SqlParameter("@tungay", SqlDbType.NVarChar, 50);
                        SqlParameter denngayxong = new SqlParameter("@denngay", SqlDbType.NVarChar, 50);
                        SqlParameter timkiemxong = new SqlParameter("@timkiem", SqlDbType.NVarChar, 500);
                        tungayxong.Direction = ParameterDirection.Input;
                        tungayxong.Value = tungaybaocao;
                        denngayxong.Direction = ParameterDirection.Input;
                        denngayxong.Value = denngaybaocao;
                        timkiemxong.Direction = ParameterDirection.Input;
                        timkiemxong.Value = timkiembaocao;
                        cmd.Parameters.Add(tungayxong);
                        cmd.Parameters.Add(denngayxong);
                        cmd.Parameters.Add(timkiemxong);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new baocao_nhanvien() { lydo = reader["lydo"].ToString(), caonhatphut = reader["caonhatphut"].ToString(), trungbinhphut = reader["trungbinhphut"].ToString(), socongviec = reader["socongviec"].ToString(), manv = reader["manv"].ToString(), hotennv = reader["hotennv"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        // Xóa công việc
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxXoaCongViec(string ID,string TEN)
        {
            try
            {
               // string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<congviec_ketqua> dscongvieccho = new List<congviec_ketqua>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_Delete_Congviec", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter ma = new SqlParameter("@id", SqlDbType.Int );
                        SqlParameter ten1 = new SqlParameter("@TEN", SqlDbType.NVarChar,50);
                        ma.Direction = ParameterDirection.Input;
                        ten1.Direction = ParameterDirection.Input;
                        ma.Value = Int64.Parse(ID);
                        ten1.Value = TEN;
                        cmd.Parameters.Add(ma);
                        cmd.Parameters.Add(ten1);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new congviec_ketqua() { ketqua = reader["ketqua"].ToString()});
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        //---------------------------------------
        // Hoàn Thành công việc
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxHoanThanhCongViec(string ID, string MANV)
        {
            try
            {
               // string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<congviec_ketqua> dscongvieccho = new List<congviec_ketqua>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_HoanThanh_Congviec", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter ma = new SqlParameter("@id", SqlDbType.Int);
                        SqlParameter ten1 = new SqlParameter("@manv", SqlDbType.NVarChar, 50);
                        ma.Direction = ParameterDirection.Input;
                        ten1.Direction = ParameterDirection.Input;
                        ma.Value = Int64.Parse(ID);
                        ten1.Value = MANV;
                        cmd.Parameters.Add(ma);
                        cmd.Parameters.Add(ten1);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new congviec_ketqua() { ketqua = reader["ketqua"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        //---------------------------------------
        // Phân công công việc
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxPhanCongCongViec(string ID, string MANV,string HOTEN)
        {
            try
            {
              //  string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<congviec_ketqua> dscongvieccho = new List<congviec_ketqua>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_Nhan_Congviec", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter ma = new SqlParameter("@id", SqlDbType.Int);
                        SqlParameter ten1 = new SqlParameter("@manv", SqlDbType.NVarChar, 50);
                        SqlParameter hoten1 = new SqlParameter("@hoten", SqlDbType.NVarChar, 100);
                        ma.Direction = ParameterDirection.Input;
                        ten1.Direction = ParameterDirection.Input;
                        ma.Value = Int64.Parse(ID);
                        ten1.Value = MANV;
                        hoten1.Value = HOTEN;
                        cmd.Parameters.Add(ma);
                        cmd.Parameters.Add(ten1);
                        cmd.Parameters.Add(hoten1);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new congviec_ketqua() { ketqua = reader["ketqua"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        //---------------------------------------
        //Hủy nhận công việc
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxHuyNhanCongViec(string ID)
        {
            try
            {
               // string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<congviec_ketqua> dscongvieccho = new List<congviec_ketqua>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_Update_HuyNhan_Congviec", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter ma = new SqlParameter("@id", SqlDbType.Int);
                        ma.Direction = ParameterDirection.Input;
                        ma.Value = Int64.Parse(ID);
                        cmd.Parameters.Add(ma);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new congviec_ketqua() { ketqua = reader["ketqua"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        //---------------------------------------
        //Cập nhật nhân viên hỗ trợ công việc
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxCapNhatNVHTCongViec(string ID,string MANV,string HOTEN)
        {
            try
            {
               // string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<congviec_ketqua> dscongvieccho = new List<congviec_ketqua>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_Update_Congviec_NhanVien", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter idcongviec = new SqlParameter("@idcongviec", SqlDbType.Int);
                        SqlParameter manv = new SqlParameter("@manv", SqlDbType.NVarChar,50);
                        SqlParameter hoten = new SqlParameter("@hoten", SqlDbType.NVarChar, 500);
                        idcongviec.Direction = ParameterDirection.Input;
                        manv.Direction = ParameterDirection.Input;
                        hoten.Direction = ParameterDirection.Input;
                        idcongviec.Value = Int64.Parse(ID);
                        manv.Value = MANV;
                        hoten.Value = HOTEN;
                        cmd.Parameters.Add(idcongviec);
                        cmd.Parameters.Add(manv);
                        cmd.Parameters.Add(hoten);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new congviec_ketqua() { ketqua = reader["ketqua"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        //---------------------------------------
        // Yêu cầu làm lại công việc
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxYeuCauLamLaiCongViec(string ID)
        {
            try
            {
              //  string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<congviec_ketqua> dscongvieccho = new List<congviec_ketqua>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_LamLai_Congviec", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter ma = new SqlParameter("@id", SqlDbType.Int);
                        ma.Direction = ParameterDirection.Input;
                        ma.Value = Int64.Parse(ID);
                        cmd.Parameters.Add(ma);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new congviec_ketqua() { ketqua = reader["ketqua"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        //---------------------------------------
        // Đánh  giá công việc
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxDanhGiaCongViec(string ID,string DANHGIA)
        {
            try
            {
              //  string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<congviec_ketqua> dscongvieccho = new List<congviec_ketqua>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_DanhGia_Congviec", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter ma = new SqlParameter("@id", SqlDbType.Int);
                        SqlParameter xldanhgia = new SqlParameter("@danhgia", SqlDbType.NVarChar,50);
                        ma.Direction = ParameterDirection.Input;
                        ma.Value = Int64.Parse(ID);
                        xldanhgia.Direction = ParameterDirection.Input;
                        xldanhgia.Value = DANHGIA;
                        cmd.Parameters.Add(ma);
                        cmd.Parameters.Add(xldanhgia);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new congviec_ketqua() { ketqua = reader["ketqua"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        //---------------------------------------
        //Thêm mô tả công việc
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxThemMoTaCongViec(string ID, string MOTA)
        {
            try
            {
              //  string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<congviec_ketqua> dscongvieccho = new List<congviec_ketqua>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_ThemMoTa_Congviec", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter ma = new SqlParameter("@id", SqlDbType.Int);
                        SqlParameter xldanhgia = new SqlParameter("@mota", SqlDbType.NVarChar, 500);
                        ma.Direction = ParameterDirection.Input;
                        ma.Value = Int64.Parse(ID);
                        xldanhgia.Direction = ParameterDirection.Input;
                        xldanhgia.Value = MOTA;
                        cmd.Parameters.Add(ma);
                        cmd.Parameters.Add(xldanhgia);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new congviec_ketqua() { ketqua = reader["ketqua"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        //---------------------------------------
        //nhân viên màu sắc
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxNhanVienMauSac()
        {
            try
            {
                //string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<nhanvien_mausac> dscongvieccho = new List<nhanvien_mausac>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_Get_NhanVien_MauSac", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new nhanvien_mausac() { manv = reader["manv"].ToString(), hoten = reader["hoten"].ToString(), mausac = reader["mausac"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        //---------------------------------------
        //biểu đồ đường
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxbaocaocongviectheongay()
        {
            try
            {
                //string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<baocao_hoanthanh_theongay> dscongvieccho = new List<baocao_hoanthanh_theongay>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_BaoCao_congviec_hoanthanh_theongay", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new baocao_hoanthanh_theongay() { soluong = reader["soluong"].ToString(), ngay = reader["ngay"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
        //biểu đồ bánh
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public static string tbAjaxbaocaocongviecngayhientai()
        {
            try
            {
                //string connectionString = ConfigurationManager.ConnectionStrings["AulacDbConnect"].ConnectionString.Replace(@"\\", @"\");
                List<congviec_hoanthanh_ngayht> dscongvieccho = new List<congviec_hoanthanh_ngayht>();
                using (SqlConnection connection = new SqlConnection(strConnString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_BaoCao_congviec_hoanthanh_ngayht_nhanvien", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            connection.Close();
                        }
                        else
                        {
                            while (reader.Read())
                                dscongvieccho.Add(new congviec_hoanthanh_ngayht() { ngay = reader["ngay"].ToString(), mausac = reader["mausac"].ToString(), hotennv = reader["hotennv"].ToString(), soluong = reader["soluong"].ToString() });
                        }
                    }
                }


                return JsonConvert.SerializeObject(dscongvieccho);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}