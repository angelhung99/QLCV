using AulacEmsWeb.model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Net;
using System.Text.RegularExpressions;
using System.Web.UI.WebControls;

namespace tableTW
{
    public partial class login : System.Web.UI.Page
    {
        string connectionString = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            string[] lines = System.IO.File.ReadAllLines(Server.MapPath("~") + "./file.txt");
            if (lines.Length >= 3) { 
            connectionString = "Data Source="+ lines[0] + ";Initial Catalog="+ lines[1] + ";User Id="+ lines[2] + ";Password=" + lines[3] + ";Connection Timeout=10;".Replace(@"\\", @"\");
            }
            else
            {
                btn_ketnoi_Click(null, null);
                Response.Redirect("KetNoiCSDL.aspx");
                string script = "alert(\"Lỗi kết nối cơ sở dữ liệu hãy thiết lập kết nối CSDL!\");";
                ScriptManager.RegisterStartupScript(this, GetType(),
                                      "ServerControlScript", script, true);
            }
        }
        protected bool LuuVetDangNhap_Add(layLuuVetDangNhap lvdndto)
        {
            try
            {
               
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_spLuuVetDangNhap", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter account = new SqlParameter("@account", SqlDbType.NVarChar, 50);
                        SqlParameter wanip = new SqlParameter("@wanip", SqlDbType.NVarChar, 50);
                        SqlParameter lanip = new SqlParameter("@lanip", SqlDbType.NVarChar, 50);
                        account.Direction = ParameterDirection.Input;
                        wanip.Direction = ParameterDirection.Input;
                        lanip.Direction = ParameterDirection.Input;
                        account.Value = lvdndto.account;
                        wanip.Value = lvdndto.wanip;
                        lanip.Value = lvdndto.lanip;
                        cmd.Parameters.Add(account);
                        cmd.Parameters.Add(wanip);
                        cmd.Parameters.Add(lanip);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {                       
                            return false;
                        }
                        else
                        {
                        
                            return true;
                        }
                    }
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        private string GetIpAddress()
        {
           string userip = Request.UserHostAddress;
            if (Request.UserHostAddress != null)
            {
                Int64 macinfo = new Int64();
                string macSrc = macinfo.ToString("X");
                if (macSrc == "0")
                {
                    if (userip == "127.0.0.1")
                    {
                        return userip;
                    }
                    else
                    {
                        return userip;
                    }
                }
            }
            return "";
        }
        public static string getExternalIp()
        {
            try
            {
                string externalIP;
                externalIP = (new WebClient()).DownloadString("http://checkip.dyndns.org/");
                externalIP = (new Regex(@"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"))
                             .Matches(externalIP)[0].ToString();
                return externalIP;
            }
            catch { return null; }
        }
        protected void btn_ketnoi_Click(object sender, EventArgs e)
        {
            Response.Redirect("KetNoiCSDL.aspx");
        }
            protected void Submit_Click(object sender, EventArgs e)
        {
           
            try
            {
             
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("WebGiuong_ACCOUNT", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter ACCOUNT = new SqlParameter("@ACCOUNT", SqlDbType.NVarChar, 20);
                        ACCOUNT.Direction = ParameterDirection.Input;
                        ACCOUNT.Value = txtTen.Text;
                        cmd.Parameters.Add(ACCOUNT);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader == null)
                        {
                            string script = "alert(\"Không tồn tại người dùng này!\");";
                            ScriptManager.RegisterStartupScript(this, GetType(),
                                                  "ServerControlScript", script, true);
                        }
                        else
                        {
                            while (reader.Read())
                            {
                           
                                if (reader["Password"].ToString() == txtPass.Text)
                                {
                                    layLuuVetDangNhap lvdn = new layLuuVetDangNhap();
                                    lvdn.account = txtTen.Text;
                                    lvdn.wanip = getExternalIp();
                                    lvdn.lanip = GetIpAddress();
                                    if (LuuVetDangNhap_Add(lvdn))
                                    {
                                        if (reader["MaKhoaLS"].Equals("008") && !txtTen.Text.Equals("miT004"))
                                        {
                                            Session["username"] = txtTen.Text;
                                            Session["manv"] = reader["MaNV"].ToString();
                                            Session["hoten"] = reader["hoten"].ToString();
                                            Session["Qadmin"] = reader["Qadmin"].ToString();
                                            Response.Redirect("indexQLCV.aspx");
                                        }
                                    }
                                    else
                                    {
                                        string script = "alert(\"Gặp lỗi khi đăng nhập!\");";
                                        ScriptManager.RegisterStartupScript(this, GetType(),
                                                              "ServerControlScript", script, true);
                                    }
                                }
                                else
                                {
                                    string script = "alert(\"Sai thông tin đăng nhập!\");";
                                    ScriptManager.RegisterStartupScript(this, GetType(),
                                                          "ServerControlScript", script, true);
                                }
                            }
                            
                        }
                    }
                }
            }
            catch (Exception)
            {
                string script = "alert(\"Lỗi kết nối cơ sở dữ liệu hãy thiết lập kết nối CSDL!\");";
               
                ScriptManager.RegisterStartupScript(this, GetType(),
                                      "ServerControlScript", script, true);
            }
        }
    }
}